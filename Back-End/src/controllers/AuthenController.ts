import Elysia, {t} from 'elysia';
import User from '../models/UserModel';
import * as argon2 from "argon2";

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$'})

const controllerAuthen = new Elysia()
.get('/user/:id', ({ params }) => {
   const userFind = User.findById(params.id)

   return userFind
}, {
    params: t.Object({ id: idMongodb})
})
.post('/register', async ({ body }) => {
    
    const exists = await User.find({ email: body.email})

    if (exists) return { message: 'fail',
        status: 404
    }

    await User.create({
        name: body.name,
        email: body.email,
        password: await argon2.hash(body.passsword),
        active: true,
    })
}, {
    body: t.Object({
        name: t.String({ maxLength: 50}),
        email: t.String({ format: 'email' }),
        passsword: t.String({ maxLength: 16, minLength: 8})
    })
})
.put('/update/:id', async ({ params, body }) => {
    const user = User.findById(params.id)

    if (!user) return { message: 'fail',
        status: 404
    }

    await user.updateOne({
        name: body.name,
        email: body.email,
    })
},{
    params: t.Object({ id: idMongodb}),
    body: t.Object({
        name: t.String({ maxLength: 50}),
        email: t.String({ format: 'email' }),
    })
})
.put('/updatePassword/:id', async ({ params, body }) => {
    const user = User.findById(params.id)

    if (!user) return

    await user.updateOne({
        password: await argon2.hash(body.passsword),
    })
},{
    params: t.Object({ id: idMongodb}),
    body: t.Object({
        passsword: t.String({ maxLength: 16, minLength: 8})
    })
})
.put('/delete/:id', ({ params }) => {
    const user = User.findById(params.id)

    if (!user) return

    user.updateOne({
        active: false
    })
},{
    params: t.Object({ id: idMongodb}),
})

export default controllerAuthen