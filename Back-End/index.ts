import Elysia, { t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import controllerAuthen from "./src/controllers/AuthenController";
import controllerBot from "./src/controllers/BotController";
import "./src/providers/MongodbProvider";

const app = new Elysia()
    .use(swagger())
    .use(controllerAuthen)
    .use(controllerBot)
    .listen(4001)
