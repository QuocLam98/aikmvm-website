import Elysia, { t } from 'elysia';
import BotModel from '../models/BotModel';
import UserModel from '../models/UserModel';

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerBot = new Elysia()
  .get('/list-bot', async ({ query }) => {
    const page = query.page ?? 1
    const limit = query.limit ?? 10

    const skip = (page - 1) * limit

    const [bots, total] = await Promise.all([
      BotModel.find().skip(skip).limit(limit),
      BotModel.countDocuments()
    ])

    return {
      message: 'success',
      status: 200,
      data: bots,
      total: total
    }
  }, {
    query: t.Object({
      page: t.Optional(t.Number({ minimum: 1 })),
      limit: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
    })
  })
  .get('/list-bot-admin', async () => {

    const listBot = BotModel.find()

    return listBot
  })
  .post('/registerBot', async ({ body, error }) => {

    const exists = await BotModel.findOne({ name: body.name })
    console.log(exists)
    if (exists) return error(404, 'fail')

    const createBot = await BotModel.create({
      name: body.name,
      templateMessage: body.templateMessage,
      active: true,
    })

    return createBot.toObject()
  }, {
    body: t.Object({
      name: t.String({ maxLength: 50 }),
      templateMessage: t.String({ maxLength: 500 })
    })
  })
  .put('/update-bot/:id', async ({ params, body, set, error }) => {
    const bot = await BotModel.findById(params.id)
    set.status = 404
    if (!bot) return error(404, 'fail')

    await bot.updateOne({
      name: body.name,
      templateMessage: body.templateMessage,
    })
    const botUpdate = await BotModel.findById(params.id)

    set.status = 200
    return botUpdate?.toObject()
  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      name: t.String({ maxLength: 50 }),
      templateMessage: t.String({ maxLength: 500 }),
    })
  })
  .delete('/delete', () => {

  })

export default controllerBot