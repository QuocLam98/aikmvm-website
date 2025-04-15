import Elysia, { t } from 'elysia';
import UseBotModel from '../models/UseBotModel';
import UserModel from '../models/UserModel';
import BotModel from '../models/BotModel';

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerUseBot = new Elysia()
  .post('/list-use-bot/', async ({ body }) => {

    const existsUser = await UserModel.findOne({ email: body.email });

    if (!existsUser) {
      return {
        message: 'User not found',
        status: 404
      };
    }

    const listUseBot = await UseBotModel.find({ user: existsUser._id }).populate('bot', ['name', 'templateMessage']);

    return {
      message: 'Success',
      status: 200,
      data: listUseBot
    };
  }, {
    body: t.Object({
      email: t.String({ maxLength: 250 })
    })
  })
  .post('/registerUseBot', async ({ body }) => {

    const existsUser = await UserModel.findOne({ email: body.email })

    if (!existsUser) return {
      message: 'fail',
      status: 404
    }

    const existsBot = await BotModel.findById(body.botId)


    if (!existsBot) return {
      message: 'fail',
      status: 404
    }

    const created = await UseBotModel.create({
      user: existsUser._id,
      bot: body.botId,
      templateMessage: body.templateMessage,
      active: true,
    })

    return created.toObject()
  }, {
    body: t.Object({
      email: t.String({ maxLength: 250 }),
      botId: t.String({ botId: idMongodb }),
      templateMessage: t.String({ maxLength: 500 })
    })
  })
  .put('/update-use-bot/:id', async ({ params, body, error }) => {
    const exists = await UseBotModel.findById(params.id)

    if (!exists) return error(404, 'fail')

    await exists.updateOne({
      templateMessage: body.templateMessage
    })

    const updated = await UseBotModel.findById(params.id);

    return updated

  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      templateMessage: t.String({ maxLength: 500 })
    })
  })
  .delete('/delete', () => {

  })

export default controllerUseBot