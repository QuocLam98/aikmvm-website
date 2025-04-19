import { defineProvider } from './Application'


export default defineProvider(() => {
    const config = {
        PORT: process.env.APP_PORT as string,
        CONNECT : process.env.CONNECT_STRING_MONGODB as string,
        JWT_ALG : process.env.JWT_ALG as string,
        JWT_SECRET : process.env.JWT_SECRET as string,
        OPENAI_KEY: process.env.OPENAI_KEY as string,
        URL_CLIENT: process.env.URL_CLIENT as string,
        API_KEY_SEND_MAIL: process.env.API_KEY_SEND_MAIL as string,
    }

    return {config}
})