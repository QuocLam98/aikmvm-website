import app from './src/app'
import { Elysia } from 'elysia'
import swagger from '@elysiajs/swagger'
import routers from './Routers'

app.start(async () => {
  const http = new Elysia()

    // app.logger.info('Swagger UI is available')
    http.use(swagger())
  
  http.use(routers)
  http.listen(3000)
  app.on('stop', () => http.stop())
  // app.logger.info(`🦊 Elysia is running at ${http.server?.hostname}:${http.server?.port}`)
})