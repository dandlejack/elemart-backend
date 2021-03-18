import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type ProductDocument = Product & mongoose.Document

@Schema()
export class Product {
    @Prop()
    product_id: string;
    @Prop()
    product_name: string;
    @Prop()
    current_amount: number;
    @Prop()
    history_table: Array<Object>;
    @Prop()
    date: Date;    
    @Prop()
    createdBy: string;
    @Prop()
    updatedBy: string;
    @Prop()
    createdDate: Date;
    @Prop()
    updateDate: Date;
}
export interface ProductProps {
    _id: string;
    product_id: string;
    product_name: string;
    current_amount: number;
    history_table: Array<Object>;
    date: Date;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updateDate: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
