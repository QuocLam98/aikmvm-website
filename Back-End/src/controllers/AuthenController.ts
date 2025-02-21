import Elysia, {t} from 'elysia';
import * as mongoose from 'mongoose';

const rule = {
    create: t.Object({}),
    update: t.Object({}),
    delete: t.Object({})
}

export default new Elysia()
.get('/', () => {

})
.post('/create', () => {
    
})
.put('/update', () => {
    
})
.delete('/delete', () => {
    
})