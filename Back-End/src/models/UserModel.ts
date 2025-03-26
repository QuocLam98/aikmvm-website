import { Elysia } from "elysia";
import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
    credit: number,
    bankAccount: string,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
    bank: string
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true,},
    password: { type: String, required: true},
    credit: { type: Number, default: 1 },
    bankAccount: { type: String },
    bank: {type: String},
    active: { type: Boolean, required: true}
}, {
    timestamps: true
})

export default model<IUser>('User', UserSchema)