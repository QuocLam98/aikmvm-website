import { Schema, model, type ObjectId } from "mongoose";

interface IMessage {
    bot: ObjectId,
    user: ObjectId,
    contentUser: string,
    contentBot: string,
    tookenRequest: string,
    tookendResponse: string,
    updatedAt: Date,
    createdAt: Date,
}

const MessageSchema = new Schema<IMessage>({
    bot: { type: Schema.Types.ObjectId, ref: 'BotManange', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contentUser: { type: String},
    contentBot: { type: String },
    tookenRequest: { type: String },
    tookendResponse: { type: String },
    
}, {
    timestamps: true
})

export default model<IMessage>('MessageManage', MessageSchema)