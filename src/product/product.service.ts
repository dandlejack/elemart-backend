import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductProps } from './product.model';
import {Model} from 'mongoose'
import { PaidProps } from 'src/paid/paid.model';
@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private productModel: Model<ProductProps>,@InjectModel('paid') private paidModel: Model<PaidProps>) { }

    async insert(data:ProductProps) {
        const duplicateCheck = await this.productModel.findOne({product_id:data.product_id}).exec()
        if(duplicateCheck === null){
            const curDate = new Date(Date.now())
            data.createdDate = curDate
            data.updateDate = curDate
            const newProduct = new this.productModel(data)
            const createdProduct = new this.productModel(newProduct)
            return createdProduct.save();
        }else{
            return 'รหัสสินค้าซ้ำ'
        }
        
    }

    async findAll(req,res) {
            const params = req.query
            const pageNumber = Number(params.pageNumber || "1");
            const limits = Number(params.limitPage || '20')
            const filterObject = req.query.filterObject && JSON.parse(req.query.filterObject as string) || {};
            const skip = (pageNumber - 1) * limits;
            const totalDocument = await this.productModel.countDocuments(filterObject);
            const totalPage = Math.ceil(totalDocument / limits);
            const sorts = {product_id:1}
            const data = await this.productModel.find(filterObject).sort(sorts).limit(limits).skip(skip).exec()
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
        return await this.productModel.find({_id:id}).exec();
    }

    async updateById(id: string, data: ProductProps) {
        await this.productModel.findByIdAndUpdate(id,data).exec();
        return 'Update Successful.'
    }

    async deleteById(id: string) {
        await this.productModel.deleteOne({_id:id}).exec();
        return 'Delete Successful.'
    }
    async updateData(id:string,data: ProductProps){
        data.updateDate = new Date(Date.now())
    }
}
