import { Elysia } from "elysia";
import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    passsword: string,
    credit: number,
    bankAccount: string
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true,},
    passsword: { type: String, required: true},
    credit: { type: Number },
    bankAccount: { type: String }
})

export default model<IUser>('User', UserSchema)