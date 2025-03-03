import Elysia, {t} from 'elysia';
import UseBotModel from '../models/UseBotModel';
import UserModel from '../models/UserModel';
import BotModel from '../models/BotModel';

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$'})

const controllerUseBot = new Elysia()
.get('/listByUserId/:id', async ({ params }) => {

    const user = await UserModel.findById(params.id)

    if (!user) return { message: 'fail',
        status: 404
    } 

    const listBot = UseBotModel.find(user.id)

    return listBot
},{
    params: t.Object({ id: idMongodb})
})
.post('/registerUseBot', async ({ body }) => {
    
    const existsUser = await UserModel.findById(body.userId)

    if (!existsUser) return {
        message: 'fail',
        status: 404
    }

    const existsBot = await BotModel.findById(body.botId)

    
    if (!existsBot) return {
        message: 'fail',
        status: 404
    }

     await UseBotModel.create({
        userId: body.userId,
        botId: body.botId,
        templateMessage: body.templateMessage,
        active: true,
    })

    return {
        message: 'created',
        status: 201
    }
}, {
    body: t.Object({
        userId: t.String({ maxLength: 50}),
        botId: t.String({ maxLength: 250}),
        templateMessage: t.String({ maxLength: 500 })
    })
})
.put('/update', () => {
    
})
.delete('/delete', () => {
    
})

export default controllerUseBot