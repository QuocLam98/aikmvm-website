import { Elysia } from 'elysia'
import { createSWAT } from 'swa-token'
import { defineProvider } from './Application'
import ConfigProvider from './ConfigProvider'

export default defineProvider ([
    ConfigProvider
],(ctx) => {
    const swat = createSWAT(ctx.service.config.JWT_SECRET)

    return { swat }
})