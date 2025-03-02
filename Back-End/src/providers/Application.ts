type Pair = Record<any, unknown>
type ValuePromise<P> = P extends Promise<infer V> ? V : P

type ProviderHandler<A extends Application = Application<any>, R = any> = (app: A) => Promise<R>|R
export type Provider = { handler: ProviderHandler, deps: Array<Provider> }

type ProviderReturn<T extends Provider> = Awaited<ReturnType<T['handler']>> extends undefined
  ? undefined
  : ValuePromise<ReturnType<T['handler']>>

type InspectDependencies<P extends Provider[]> = P extends [infer PFirst, ...infer PRest]
  ?
    PFirst extends Provider
      ?
        PRest extends Provider[]
          ? ProviderReturn<PFirst> & InspectDependencies<PRest> & InspectDependencies<PFirst['deps']>
          : ProviderReturn<PFirst> & InspectDependencies<PFirst['deps']>
      : {}
  : {}

export type ProviderInjectData<T extends Provider> = ProviderReturn<T> & InspectDependencies<T['deps']>

export type Prettify<T> = { [K in keyof T]: T[K] } & {}

interface DefineProvider {
  <
    const Dependencies extends Provider[],
    const Deps extends InspectDependencies<Dependencies>,
    const Handler extends ProviderHandler<Application<Deps>>,
  >(handler: Handler): { handler: Handler, deps: Dependencies }

  <
    const Dependencies extends Provider[],
    const Deps extends InspectDependencies<Dependencies>,
    const Handler extends ProviderHandler<Application<Deps>>,
  >(deps: Dependencies, handler: Handler): { handler: Handler, deps: Dependencies }
}

// @ts-ignore
export const defineProvider: DefineProvider = (maybeHandler, handler) => {
  if (! handler) {
    return { handler: maybeHandler, deps: [] }
  }

  return { handler, deps: maybeHandler }
}

type ApplicationEvent = {
  start: void
  started: void
  stop: void
  stopped: void
}

const flatProvider = (providers: Provider[]) => {
  const set = new Set<Provider>

  const flat = (provider: Provider) => {
    set.add(provider)

    for (const dep of provider.deps) {
      flat(dep)
    }
  }

  for (const provider of providers) {
    flat(provider)
  }

  return [... set]
}

const groupProvidersByBootOrder = (providers: Provider[]) => {
  providers = flatProvider(providers)

  const inDegree: Map<Provider, number> = new Map()
  const adjacencyList: Map<Provider, Provider[]> = new Map()
  const queue: Provider[] = []

  // Initialize inDegree and adjacencyList
  for (const provider of providers) {
    inDegree.set(provider, 0)
    adjacencyList.set(provider, [])
  }

   // Build the graph
  for (const provider of providers) {
    for (const dep of provider.deps) {
      adjacencyList.get(dep)?.push(provider)
      inDegree.set(provider, (inDegree.get(provider) || 0) + 1)
    }
  }


  // Find providers with no dependencies (in-degree 0)
  for (const provider of providers) {
    inDegree.get(provider) === 0 && queue.push(provider);
  }

  const result: Provider[][] = []

  // Perform topological sorting
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: Provider[] = [];

    for (let i = 0; i < levelSize; i++) {
      const provider = queue.shift()!
      currentLevel.push(provider)

      for (const dep of adjacencyList.get(provider) || []) {
        inDegree.set(dep, (inDegree.get(dep) || 0) - 1)
        inDegree.get(dep) === 0 && queue.push(dep)
      }
    }

    result.push(currentLevel)
  }

  return result
}

type AppOptions = {

  /**
   * Graceful shutdown
   *
   * @default true
   */
  gracefulShutdown: boolean
}

export class Application <Services extends Pair = Pair> {
  readonly service = {} as Prettify<Services>

  private _state: 'created'|'starting'|'started'|'stopping'|'stopped' = 'created'

  /**
   * Promise of booting the application
   */
  private _process: Promise<unknown>|undefined
  private readonly _handlers = {} as Record<string, Array<() => unknown>>
  private readonly _providers = new Array<ReturnType<typeof defineProvider>>()

  get status() { return this._state }

  readonly options: AppOptions

  constructor(options?: Partial<AppOptions>) {
    const { gracefulShutdown = true } = options || {}

    this.options = {
      gracefulShutdown
    }
  }

  use<const T extends Provider>(provider: T) {
    this._providers.push(provider)

    return this as unknown as Application<Services & ProviderInjectData<T>>
  }

  on(event: keyof ApplicationEvent | (String & {}), handler: () => unknown) {
    const key = event as string
    this._handlers[key] ??= []
    this._handlers[key].push(handler)
  }

  start<const Callback extends undefined|(() => unknown)>(callback?: Callback) {
    this._state = 'starting'

    type Return = Callback extends {} ? Application<Services> : Promise<Application<Services>>

    const application: Application = {
      on: this.on.bind(this),
      use: this.use.bind(this),
      start: this.start.bind(this),
      stop: this.stop.bind(this),
      _handlers: this._handlers,
      _providers: this._providers,
      service: this.service
    } as any

    const inject = async (provider: Provider) => {
      const inject = await provider.handler(application)
      inject && Object.assign(this.service as object, inject)
    }

    const boot = groupProvidersByBootOrder(this._providers)

    const begin = async () => {
      this._state = 'starting'
      this.options.gracefulShutdown && Application.handleShutdown(this)

      for (const group of boot) {
        await Promise.all(group.map(inject))
      }

      await Application.dispatchEvent('start', this)
      await Application.dispatchEvent('started', this)
      this._state = 'started'
    }

    this._process = begin()

    if (callback) {
      this._process.then(callback)
      return this as unknown as Return
    }

    return this._process.then(() => this) as Return
  }

  /**
   *
   * @returns `true` if the application is stopped, otherwise `false`
   */
  async stop() {
    if (this._state !== 'started' && !this._process) {
      return false
    }

    await this._process
    this._process = undefined

    this._state = 'stopping'
    await Application.dispatchEvent('stop', this)

    for (const key in this.service) {
      delete this.service[key]
    }

    await Application.dispatchEvent('stopped', this)
    this._state = 'stopped'

    return true
  }

  private static dispatchEvent(event: keyof ApplicationEvent | (String & {}), app: Application) {
    const key = event as string
    const handlers = app._handlers[key] ?? []

    if (handlers && handlers.length) {
      return Promise.allSettled(handlers.map(handler => handler.call(app)))
    }
  }

  private static handleShutdown(app: Application) {
    const shutdown = async () => {
      try {
        await app.stop()
      } catch (e) {
        console.error(e)
        process.exit(1)
      }

      process.exit(0)
    }

    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
    process.on('SIGHUP', shutdown)
  }
}

export const createServiceAlias = <const A extends Application>(app: A): A & A['service'] => {
  const proxy = new Proxy(app, {
    get(target, prop) {
      // @ts-ignore
      return target[prop] || target.service[prop]
    }
  })

  return proxy as any
}

export default Application