import Elysia, { t } from "elysia";
import controllerAuthen from "./src/controllers/AuthenController";
import controllerBot from "./src/controllers/BotController";
import controllerUseBot from "./src/controllers/UserBotController";
import controllerMessage from "~/controllers/MessageController";
import "./src/providers/MongodbProvider";

const routers = new Elysia()
  .use(controllerAuthen)
  .use(controllerAuthen)
  .use(controllerBot)
  .use(controllerUseBot)
  .use(controllerMessage)

export default routers