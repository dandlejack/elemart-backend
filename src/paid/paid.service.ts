import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { ProductProps } from 'src/product/product.model';
import { timeSetting } from 'src/util/timeSetting';
import { PaidProps } from './paid.model';
@Injectable()
export class PaidService {
    constructor(@InjectModel('paid') private paidModel: Model<PaidProps>,@InjectModel('product') private productModel: Model<ProductProps>) { }

    async insert(data:PaidProps) {        
        const splitDate = data.invoice_date.split('/')
        const reportDate = timeSetting(splitDate)
        data.createdDate = new Date(reportDate)
        data.updateDate = new Date(reportDate)
        const newCustomer = new this.paidModel(data)
        const createdCustomer = new this.paidModel(newCustomer)
        return createdCustomer.save();
    }

    async findAll(req,res) {
        const params = req.query
        const pageNumber = Number(params.pageNumber || "1");
        const limits = Number(params.limitPage || '20')
        const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
        const skip = (pageNumber - 1) * limits;
        const totalDocument = await this.paidModel.countDocuments(filterObject);
        const totalPage = Math.ceil(totalDocument / limits);
        const sortDate = {
            createdDate:-1
        }
        const data = await this.paidModel.find(filterObject).sort(sortDate).skip(skip).limit(limits).exec()
        const result = {
            data: data,
            totalDocument: totalDocument,
            pageNumber: pageNumber,
            totalPage: totalPage,
            message: "success"
            };
        return result
    }
    
    async findById(id: string) {
        return await this.paidModel.find({_id:id}).exec();
    }

    async updateById(id: string, data: PaidProps) {
        data.updateDate = new Date(Date.now())
        await this.paidModel.findByIdAndUpdate(id,data).exec();
        return 'Update Successful.'
    }

    
    async deleteById(id: string) {
        const storeProductFromPaid = []
        const paidResult = await this.paidModel.find({_id:id})
        paidResult[0].data_table.map(data=>{
            storeProductFromPaid.push(
                {
                    product_id:data.product_id,
                    paid_amount: data.paid_amount
                }
            )
        })
        storeProductFromPaid.map(async(data)=>{
            const cur = data.paid_amount
            await this.productModel.updateOne({product_id:data.product_id},{$inc:{
                current_amount:cur
            }})
        })
        const result = await this.productModel.updateMany({history_table:id},{$pull:{history_table:id}})
        await this.paidModel.deleteOne({_id:id}).exec();
        return 'Delete Successful.'
    }
}
