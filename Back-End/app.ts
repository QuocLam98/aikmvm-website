import Application, { createServiceAlias } from './src/providers/Application'
import LoggerProvider from './src/providers/LoggerProvider'
import MongoProvider from './src/providers/MongodbProvider'

const app = new Application()
  .use(LoggerProvider)
  .use(MongoProvider)

export default createServiceAlias(app)