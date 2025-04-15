import { Schema, model, type ObjectId } from "mongoose";

interface IHistory {
    user: ObjectId,
    value: number,
    service: string,
    updatedAt: Date,
    createdAt: Date,
    active: boolean
}

const HistorySchema = new Schema<IHistory>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: Number},
    service: { type: String },
    active: { type: Boolean, required: true}
}, {
    timestamps: true
})

export default model<IHistory>('History', HistorySchema)