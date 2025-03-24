import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer'
import app from "~/app";


export default new Elysia()
.use(bearer())
.resolve({ }, ({bearer, error}) => {
    if (!bearer)
    {
        return error(403, 'Unauthorized')
    }

    if (! app.service.swat.verify(bearer))
        {
            return error(403, 'Unauthorized')
        }

    
})