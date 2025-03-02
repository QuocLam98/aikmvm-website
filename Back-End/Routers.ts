import Elysia, { t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import controllerAuthen from "./src/controllers/AuthenController";
import controllerBot from "./src/controllers/BotController";
import "./src/providers/MongodbProvider";

const routers = new Elysia()
    .use(controllerAuthen)
    .use(controllerBot)

export default routers