import { Schema, model } from "mongoose";

interface IUseBot {
    userId: string
    botId: string
    templateMessage: string
    createdAt: Date
    updateAt: Date
    active: boolean
}

const UseBotSchema = new Schema<IUseBot>({
    userId: { type: String, required: true},
    botId: { type: String, required: true},
    templateMessage: { type: String},
    active: { type: Boolean, required: true}
}, {
    timestamps: true
})

export default model<IUseBot>('UseBotManage', UseBotSchema)