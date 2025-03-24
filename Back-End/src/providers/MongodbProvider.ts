import { defineProvider } from './Application'
import ConfigProvider from './ConfigProvider'
import mongoose from 'mongoose'
import LoggerProvider from './LoggerProvider'

export default defineProvider([
  ConfigProvider,
], async ({ service, on }) => {

  await mongoose.connect(service.config.CONNECT)

  on('stop', async () => {
    await mongoose.disconnect()
  })
})