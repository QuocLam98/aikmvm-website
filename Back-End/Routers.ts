import Elysia, { t } from "elysia";
import controllerAuthen from "./src/controllers/AuthenController";
import controllerBot from "./src/controllers/BotController";
import controllerUseBot from "./src/controllers/UserBotController";
import "./src/providers/MongodbProvider";

const routers = new Elysia()
    .use(controllerAuthen)
    .use(controllerBot)
    .use(controllerUseBot)

export default routers