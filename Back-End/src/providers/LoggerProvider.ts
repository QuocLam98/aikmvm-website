import Logger from 'pino'
import { defineProvider } from './Application'

export default defineProvider(() => {
  const logger = Logger({
    transport: {
      target: 'pino-pretty',
    },
  })

  logger.info('Logger initialized')

  return { logger }
})