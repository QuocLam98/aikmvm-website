import Elysia, { t } from 'elysia'
import UserModel from '../models/UserModel'
import BotModel from '../models/BotModel'
import MessageModel from '../models/MessageModel'
import app from '~/app'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerMessage = new Elysia()
  .get('/listMessage/:userId/:botId', async ({ params, query }) => {
    const user = await UserModel.findById(params.userId)

    if (!user) return {
      message: 'fail',
      status: 404
    }
    const bot = await BotModel.findById(params.botId)

    if (!bot) return {
      message: 'fail',
      status: 404
    }

    const message = await MessageModel.find().skip(1).limit(50)
    
  }, {
    query: t.Object({
      pageIndex: t.Optional(t.Number({minimum: 1})),
      pageSize: t.Optional(t.Number({minimum : 1, maximum: 50}))
    }),
    params: t.Object({ userId: idMongodb, botId: idMongodb })
  })
  .post('/createmessage/', async ({ body }) => {

  }, {
    body: t.Object({
      userId: t.String({ maxLength: 50}),
      botId: t.String({ maxLength: 250}),
      templateMessage: t.String({ maxLength: 1500 }),
      message: t.String({ maxLength: 1500 }),
  })
  })