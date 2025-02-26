import Elysia, {t} from 'elysia';
import BotModel from '../models/BotModel';
import UserModel from '../models/UserModel';

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$'})

const controllerBot = new Elysia()
.get('/', () => {
    BotModel.find()
})
.get('/listByUserId:id', async ({ params }) => {

    const user = await UserModel.findById(params.id)

    if (!user) return

    BotModel.find(user.id)
},{
    params: t.Object({ id: idMongodb})
})
.post('/registerBot', async ({ body }) => {
    
    const exists = await BotModel.find({ name: body.name})

    if (exists) return

    const bot = await BotModel.create({
        name: body.name,
        description: body.description,
        templateMessage: body.templateMessage,
        active: true,
    })
}, {
    body: t.Object({
        name: t.String({ maxLength: 50}),
        description: t.String({ maxLength: 250}),
        templateMessage: t.String({ maxLength: 500 })
    })
})
.put('/update', () => {
    
})
.delete('/delete', () => {
    
})

export default controllerBot