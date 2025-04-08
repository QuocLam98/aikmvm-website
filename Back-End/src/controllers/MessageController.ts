import Elysia, { t } from 'elysia'
import UserModel from '../models/UserModel'
import BotModel from '../models/BotModel'
import MessageModel from '../models/MessageModel'
import app from '~/app'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerMessage = new Elysia()
  .get('/list-message', async ({ query }) => {
    const page = query.page ?? 1
    const limit = query.limit ?? 10

    const skip = (page - 1) * limit

    const [messages, total] = await Promise.all([
      MessageModel.find().skip(skip).limit(limit)
        .populate('user', ['name'])
        .populate('bot', ['name']),
      MessageModel.countDocuments()
    ])

    return {
      message: 'success',
      status: 200,
      data: messages,
      total: total
    }
  }, {
    query: t.Object({
      page: t.Optional(t.Number({ minimum: 1 })),
      limit: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
    })
  })
  .post('/create-message', async ({ body }) => {
    const user = await UserModel.findById(body.user)

    if (!user) return {
      message: 'fail',
      status: 404
    }
    const bot = await BotModel.findById(body.bot)

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

    await MessageModel.create({
      user: body.user,
      bot: body.bot,
      templateMessage: body.templateMessage,
      contentUser: body.message,
      contentBot: completions.choices[0].message.content,
      tookenRequest: completions.usage?.prompt_tokens,
      tookendResponse: completions.usage?.completion_tokens,
      active: true,
    })

    return {
      message: 'success',
      status: 200,
      tokken: completions.usage,
      data: completions.choices,
    }
  }, {
    body: t.Object({
      user: t.String({ maxLength: 50 }),
      bot: t.String({ maxLength: 250 }),
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
          "content": 'trả lời như một tiến sĩ soạn giáo án ở Việt Nam'
        },
        {
          "role": "user",
          "content": "Lập kế hoạch giảng dạy môn Lịch sử lớp 12 theo công văn 5512"
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