import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
export type UsersDocument = Users & mongoose.Document

@Schema()
export class Users {
    @Prop()
    fullname: string;
    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    role: string;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface UsersProps {
    _id: string;
    fullname: string;
    username:string;
    password:string;
    role:string
    createdDate: Date;
    updateDate: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
