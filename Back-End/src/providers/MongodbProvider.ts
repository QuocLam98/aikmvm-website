import { defineProvider } from './Application'
import ConfigProvider from './ConfigProvider'
import mongoose from 'mongoose'
import LoggerProvider from './LoggerProvider'

export default defineProvider([
  ConfigProvider,
  LoggerProvider
], async ({ service, on }) => {

  service.logger.info('Connecting to MongoDB...')
  await mongoose.connect(service.config.mongo.dsn)
  service.logger.info('Connected to MongoDB')

  on('stop', async () => {
    await mongoose.disconnect()
    service.logger.info('Disconnected from MongoDB')
  })
})