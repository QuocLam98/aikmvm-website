import { Schema, model } from "mongoose";

interface IMessage {
    botId: string,
    userId: string,
    contentUser: string,
    contentBot: string,
    tookenRequest: string,
    tookendResponse: string,
    updatedAt: Date,
    createdAt: Date,
}

const MessageSchema = new Schema<IMessage>({
    botId: { type: String, required: true},
    userId: { type: String, required: true},
    contentUser: { type: String},
    contentBot: { type: String },
    tookenRequest: { type: String },
    tookendResponse: { type: String },
}, {
    timestamps: true
})

export default model<IMessage>('MessageManage', MessageSchema)