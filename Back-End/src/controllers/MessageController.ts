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

    return {
      message: 'sucess',
      status: 200,
      data: message
    }

  }, {
    query: t.Object({
      pageIndex: t.Optional(t.Number({ minimum: 1 })),
      pageSize: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
    }),
    params: t.Object({ userId: idMongodb, botId: idMongodb })
  })
  .post('/createmessage', async ({ body }) => {
    const user = await UserModel.findById(body.userId)

    if (!user) return {
      message: 'fail',
      status: 404
    }
    const bot = await BotModel.findById(body.botId)

    if (!bot) return {
      message: 'fail',
      status: 404
    }

    const completions = await app.service.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          "role": "developer",
          "content": body.templateMessage?.trim() ? body.templateMessage : bot.templateMessage
        },
        {
          "role": "user",
          "content": "write a haiku about ai"
        },
      ],
    });

    console.log(completions)
  }, {
    body: t.Object({
      userId: t.String({ maxLength: 50 }),
      botId: t.String({ maxLength: 250 }),
      templateMessage: t.String({ maxLength: 1500 }),
      message: t.String({ maxLength: 1500 }),
    })
  })
  .post('/createmessage-test', async () => {

    const completions = await app.service.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          "role": "developer",
          "content": 'trả lời như 1 nhà giáo viên toán học ở viết nam'
        },
        {
          "role": "user",
          "content": "hãy ra 1 đề kiểm tra toán 15p với 15 câu"
        },
      ],
    });

    // return completions
    return {
      message: 'success',
      status: 200,
      tokken: completions.usage,
      data: completions.choices,
    }

  })

  export default controllerMessage