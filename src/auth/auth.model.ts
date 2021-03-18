import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export type AuthDocument = Auth & mongoose.Document

@Schema()
export class Auth {
    @Prop()
    username: string;
    @Prop()
    password: string;
}
export interface AuthProps {
    _id: string;
    username:string;
    password:string;
}

export const UsersSchema = SchemaFactory.createForClass(Auth)
