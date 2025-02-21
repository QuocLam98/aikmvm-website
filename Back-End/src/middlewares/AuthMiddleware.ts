import { Elysia } from "elysia";

interface User {
    name: string,
}

export default new Elysia()
.resolve(() => {
    
})