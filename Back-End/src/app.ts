import Application, { createServiceAlias } from './providers/Application'
import LoggerProvider from './providers/LoggerProvider'
import MongoProvider from './providers/MongodbProvider'
import OpenaiProvider from './providers/OpenaiProvider'
import JWTProvider from './providers/JWTProvider'

const app = new Application()
  // .use(LoggerProvider)
  .use(MongoProvider)
  .use(OpenaiProvider)
  .use(JWTProvider)

export default createServiceAlias(app)