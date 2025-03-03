import Elysia, {t} from 'elysia';
import UserModel from '../models/UserModel';
import BotModel from '../models/BotModel';
import MessageModel from '../models/MessageModel';

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$'})

const controllerMessage = new Elysia()
.get('/listMessage/:userId/:botId', async ({ params }) => {
    const user = await UserModel.findById(params.userId)
    
        if (!user) return { message: 'fail',
            status: 404
        } 
    const bot = await BotModel.findById(params.botId)

    if (!bot) return  { message: 'fail',
        status: 404
    } 

    
    
}, {
    params: t.Object({ userId: idMongodb, botId: idMongodb})
} )