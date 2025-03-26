import Elysia, { t } from 'elysia'
import User from '../models/UserModel'
import * as argon2 from "argon2"
import AuthMiddleware from '~/middlewares/AuthMiddleware'
import app from '~/app'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerAuthen = new Elysia()
  .post('/register', async ({ body }) => {
    console.log(body)
    const exists = await User.find({ email: body.email })

    if (!exists) return {
      message: 'fail',
      status: 404
    }

    await User.create({
      name: body.name,
      email: body.email,
      password: await argon2.hash(body.password),
      active: true,
    })

    return {
      message: 'created',
      status: 201
    }
  }, {
    body: t.Object({
      name: t.String({ maxLength: 50 }),
      email: t.String({ format: 'email' }),
      password: t.String({ maxLength: 16, minLength: 8 })
    })
  })
  .get('/list-user/', async () => {
    const userFind = await User.find()

    return userFind
  })
  .use(AuthMiddleware)
  .post('/login', async ({ body }) => {

    const getUser = await User.findOne({ email: body.email })
    console.log(getUser)
    if (!getUser) return {
      message: 'fail',
      status: 404
    }


    const isMatch = await argon2.verify(getUser.password, body.password);
    if (!isMatch) {
      return { message: 'fail', status: 404 }
    }

    const tokken = await app.service.swat.create(getUser.id, '', Date.now() + 28800)

    return { message: 'success', status: 200, data: tokken }
  }, {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String({ maxLength: 16, minLength: 8 })
    })

  })
  .get('/user/:id', ({ params }) => {
    const userFind = User.findById(params.id)

    return userFind
  }, {
    params: t.Object({ id: idMongodb })
  })
  .put('/update/:id', async ({ params, body }) => {
    const user = User.findById(params.id)

    if (!user) return {
      message: 'fail',
      status: 404
    }

    await user.updateOne({
      name: body.name,
      email: body.email,
    })
  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      name: t.String({ maxLength: 50 }),
      email: t.String({ format: 'email' }),
    })
  })
  .put('/updatePassword/:id', async ({ params, body }) => {
    const user = User.findById(params.id)

    if (!user) return

    await user.updateOne({
      password: await argon2.hash(body.passsword),
    })
  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      passsword: t.String({ maxLength: 16, minLength: 8 })
    })
  })
  .put('/delete/:id', ({ params }) => {
    const user = User.findById(params.id)

    if (!user) return

    user.updateOne({
      active: false
    })
  }, {
    params: t.Object({ id: idMongodb }),
  })

export default controllerAuthen