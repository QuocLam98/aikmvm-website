import Elysia, { t } from 'elysia'
import UserModel from '../models/UserModel'
import BotModel from '../models/BotModel'
import MessageModel from '../models/MessageModel'
import app from '~/app'
import Decimal from 'decimal.js'
import UseBotModel from '~/models/UseBotModel'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerMessage = new Elysia()
  .get('/list-message', async ({ query }) => {
    const page = query.page ?? 1
    const limit = query.limit ?? 10

    const skip = (page - 1) * limit

    const [messages, total] = await Promise.all([
      MessageModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
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
  .post('/list-message-bot/:id', async ({ params, body }) => {
    const page = body.page ?? 1
    const limit = body.limit ?? 10

    const getIdUser = app.service.swat.parse(body.token).subject

    const skip = (page - 1) * limit

    const [messages, total] = await Promise.all([
      MessageModel.find({ bot: params.id, user: getIdUser }).skip(skip).limit(limit).sort({ createdAt: +1 }),
      MessageModel.countDocuments()
    ])

    return {
      message: 'success',
      status: 200,
      data: messages,
      total: total
    }
  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      token: t.String(),
      page: t.Optional(t.Number({ minimum: 1 })),
      limit: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
    })
  })
  .post('/create-message', async ({ body }) => {

    const getIdUser = app.service.swat.parse(body.token).subject

    const user = await UserModel.findById(getIdUser)

    if (!user) return {
      message: 'fail',
      status: 404
    }

    if (user.creditUsed >= user.credit) return {
      message: 'fail',
      status: 404
    }

    const bot = await BotModel.findById(body.bot)

    if (!bot) return {
      message: 'fail',
      status: 404
    }

    const useBot = await UseBotModel.findOne({ bot: bot._id, user: user._id })
    let templateMessageGet = ''
    if (!useBot) {
      templateMessageGet = bot.templateMessage
    }

    else {
      templateMessageGet = useBot.templateMessage
    }

    const completions = await app.service.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          "role": "developer",
          "content": templateMessageGet
        },
        {
          "role": "user",
          "content": body.content
        },
      ],
    });

    let priceTokenRequest = new Decimal(0)
    let priceTokenResponse = new Decimal(0)
    const priceTokenInput = new Decimal(0.0000006)
    const priceTokenOutput = new Decimal(0.0000024)

    if (completions.usage !== undefined && completions.usage !== null) {
      priceTokenRequest = new Decimal(completions.usage.prompt_tokens);
      priceTokenResponse = new Decimal(completions.usage.completion_tokens);
    }


    const totalCostInput = priceTokenRequest.mul(priceTokenInput)
    const totalCostOutput = priceTokenResponse.mul(priceTokenOutput)


    const totalCostRealInput = totalCostInput.mul(25)
    const totalCostRealOutput = totalCostOutput.mul(25)

    const messageCreated = await MessageModel.create({
      user: user._id,
      bot: body.bot,
      contentUser: body.content,
      contentBot: completions.choices[0].message.content,
      tookenRequest: completions.usage?.prompt_tokens,
      tookendResponse: completions.usage?.completion_tokens,
      creditCost: totalCostRealInput.add(totalCostRealOutput),
      active: true,
    })

    const creditUsed = new Decimal(user.creditUsed)
    const creditUsedUpdate = creditUsed.add(messageCreated.creditCost)

    await user.updateOne({
      creditUsed: creditUsedUpdate,
    })

    const messageData = {
      contentBot: completions.choices[0].message.content,
      createdAt: messageCreated.createdAt
    }

    return messageData

  }, {
    body: t.Object({
      token: t.String(),
      bot: t.String({ bot: idMongodb }),
      content: t.String({ maxLength: 1500 }),
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
