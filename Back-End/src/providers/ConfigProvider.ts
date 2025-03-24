import dotenv from "dotenv";
import { defineProvider } from './Application'

dotenv.config(); 


export default defineProvider(() => {
    const config = {
        PORT: process.env.APP_PORT as string,
        CONNECT : process.env.CONNECT_STRING_MONGODB as string,
        JWT_ALG : process.env.JWT_ALG as string,
        JWT_SECRET : process.env.JWT_SECRET as string
    }

    return {config}
})