import Elysia, {t} from 'elysia';
import User from '../models/UserModel';
import { password } from 'bun';

const controllerAuthen = new Elysia()
.get('/', () => {

})
.post('/register', async ({ body }) => {
    
    const exists = await User.find({ email: body.email})

    if (exists) return

    const user = new User({
        name: body.name,
        email: body.email,
        password: body.passsword
    })
}, {
    body: t.Object({
        name: t.String({ maxLength: 50}),
        email: t.String({ format: 'email' }),
        passsword: t.String({ maxLength: 16, minLength: 8})
    })
})
.put('/update', () => {
    
})
.delete('/delete', () => {
    
})

export default controllerAuthen