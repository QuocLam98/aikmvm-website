import Elysia, { t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import controllerAuthen from "./src/controllers/AuthenController";

const app = new Elysia()
    .use(swagger())
    .listen(4001)
