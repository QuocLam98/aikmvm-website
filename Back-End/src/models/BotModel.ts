import { Schema, model } from "mongoose";

interface IBot {
    name: string,
    description: string,
    templateMessage: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
}

const BotSchema = new Schema<IBot>({
    name: { type: String, required: true, unique: true},
    description: { type: String,},
    templateMessage: { type: String },
    active: { type: Boolean, required: true}
}, {
    timestamps: true
})

export default model<IBot>('BotManange', BotSchema)