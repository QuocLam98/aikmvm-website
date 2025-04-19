import Elysia, { t } from 'elysia'
import User from '../models/UserModel'
import * as argon2 from "argon2"
import AuthMiddleware from '~/middlewares/AuthMiddleware'
import app from '~/app'
import mjml2html from 'mjml'
import fs from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'

const idMongodb = t.String({ format: 'regex', pattern: '[0-9a-f]{24}$' })
const templatePath = path.resolve(__dirname, './templates/verify-email.mjml')
const templateSrc = fs.readFileSync(templatePath, 'utf8')

const transporter = nodemailer.createTransport({
  service: 'gmail', // hoặc dùng smtp riêng
  auth: {
    user: 'quoclam4a@gmail.com',
    pass: 'Vodanh123#' // dùng app password nếu gmail
  }
})
const controllerAuthen = new Elysia()
  .post('/register', async ({ body }) => {
    const exists = await User.find({ email: body.email })
    if (!exists) return {
      message: 'fail',
      status: 404
    }

   const createUser = await User.create({
      name: body.name,
      email: body.email,
      password: await argon2.hash(body.password),
      active: true,
      role: 'user',
      confirm: false
    })
    const token = await app.service.swat.create(createUser.id, '', Date.now() + 28800)
    const filledTemplate = templateSrc
  .replace('{{link}}', `http://aiknvm.vn/verify?token=${token}`)
  .replace('{{year}}', new Date().getFullYear().toString())

    const html = mjml2html(filledTemplate).html

    await transporter.sendMail({
      from: 'quoclam4a@gmail.com',
      to: body.email,
      subject: 'Xác minh email của bạn',
      html
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

    return { message: 'success', status: 200, token: token, role: getUser.role, email: body.email }
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
  .post('/get-user', async ({ body }) => {
    const getUser = await User.findOne({ email: body.email })

    if (!getUser) return {
      message: 'fail',
      status: 404
    }
    return {
      credit: getUser?.credit,
      creditUsed : getUser?.creditUsed
    }
  }, {
    body: t.Object({
      email: t.String({ format: 'email' }),
    })
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
      User.find().skip(skip).limit(limit).sort({ createdAt: +1 }),
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
  .get('/verify', async ({ query  }) => {
    
    const token = query.token as string

    if (!token) return { success: false, message: 'Thiếu token' }

    const getId = app.service.swat.parse(token)

    if (!getId) return { status: false, message: 'Thiếu token' }
  
    const getUser = await User.findById(getId)

    if (!getUser) return { status: 404, message: 'false' }

    await getUser.updateOne({
      confirm: true
    })
  
    return { status: 200, message: 'Xác minh thành công' }
  })
export default controllerAuthen