import Elysia, { t } from 'elysia'
import User from '../models/UserModel'
import * as argon2 from "argon2"
import AuthMiddleware from '~/middlewares/AuthMiddleware'
import app from '~/app'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })

const controllerAuthen = new Elysia()
  .post('/register', async ({ body }) => {
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
      role: 'user'
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
  .use(AuthMiddleware)
  .post('/login', async ({ body }) => {

    const getUser = await User.findOne({ email: body.email })

    if (!getUser) return {
      message: 'fail',
      status: 404
    }


    const isMatch = await argon2.verify(getUser.password, body.password);
    if (!isMatch) {
      return { message: 'fail', status: 404 }
    }

    const token = await app.service.swat.create(getUser.id, '', Date.now() + 28800)

    return { message: 'success', status: 200, token: token, role: getUser.role }
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
  .put('/update-user/:id', async ({ params, body, set, error }) => {
    const user = await User.findById(params.id)
    set.status = 404
    if (!user) return error(404, 'fail')

    await user.updateOne({
      name: body.name,
      email: body.email,
      credit: body.credit,
      role: body.role
    })

    set.status = 201
    return user.toObject()
  }, {
    params: t.Object({ id: idMongodb }),
    body: t.Object({
      name: t.String({ maxLength: 50 }),
      email: t.String({ format: 'email' }),
      credit: t.Number(),
      role: t.String({ maxLength: 50 }),
    })
  })
  .put('/updatePassword/:id', async ({ params, body, error }) => {
    const user = await User.findById(params.id)

    if (!user) return error(404, 'fail') 

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
  .get('/list-user', async ({ query }) => {
    const page = query.page ?? 1
    const limit = query.limit ?? 10
  
    const skip = (page - 1) * limit
  
    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(limit),
      User.countDocuments()
    ])
  
    return {
      message: 'success',
      status: 200,
      data: users,
      total: total
    }
  }, {
    query: t.Object({
      page: t.Optional(t.Number({ minimum: 1 })),
      limit: t.Optional(t.Number({ minimum: 1, maximum: 50 }))
    })
  })

export default controllerAuthen