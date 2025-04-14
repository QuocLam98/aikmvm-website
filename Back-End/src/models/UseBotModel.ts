import { Schema, model, type ObjectId } from "mongoose";

interface IUseBot {
    user: ObjectId
    bot: ObjectId
    templateMessage: string
    createdAt: Date
    updateAt: Date
    active: boolean
}

const UseBotSchema = new Schema<IUseBot>({
    bot: { type: Schema.Types.ObjectId, ref: 'BotManange', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    templateMessage: { type: String},
    active: { type: Boolean, required: true}
}, {
    timestamps: true
})

export default model<IUseBot>('UseBotManage', UseBotSchema)