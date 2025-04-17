import app from './src/app'
import { Elysia } from 'elysia'
import swagger from '@elysiajs/swagger'
import routers from './Routers'
import { cors } from '@elysiajs/cors'

app.start(async () => {
  const http = new Elysia()

    // app.logger.info('Swagger UI is available')
    http.use(swagger())
  http.use(
		cors({
			origin: app.service.config.URL_CLIENT
		})
	)
  http.use(routers)
  http.listen({
    port: 3000,
    idleTimeout: 30, // Đặt timeout thành 30 giây
  })
  console.log('run success')
  app.on('stop', () => http.stop())
  // app.logger.info(`🦊 Elysia is running at ${http.server?.hostname}:${http.server?.port}`)
})