import Elysia, { t } from "elysia";
import { swagger } from '@elysiajs/swagger'

const rule = {
    register: t.Object({
        name: t.String({ minLength: 1, maxLength: 20 }),
        email: t.String({ format: 'email'}),
        password: t.String({ minLength: 8, maxLength: 32 }),
        address: t.Optional(t.String())
    }),

    registerReturnBody: {
        200: t.Object({
            id: t.String({examples: ["test"]})
        }),
        400: t.Object({ message: t.String() })
    }
}

const app = new Elysia()
    .use(swagger())
    .get('/', () => 'hello world')
    .post('/register', async ({body, response}) => {

        return {id: "test"}
    }, { body: rule.register,
        response: rule.registerReturnBody
     })
    .listen(4001)
