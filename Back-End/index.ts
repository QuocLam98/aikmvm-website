import Elysia, { t } from "elysia";

const rule = {
    register: t.Object({
        name: t.String({ minLength: 1, maxLength: 20 }),
        email: t.String({ format: 'email'}),
        password: t.String({ minLength: 8, maxLength: 32 }),
        address: t.Optional(t.String())
    })
}

const app = new Elysia()
    .get('/', () => 'hello world')
    .post('/register', async ({body}) => {

    }, { body: rule.register })

app.listen(4001)