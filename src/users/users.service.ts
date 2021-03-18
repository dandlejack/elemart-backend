import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersProps } from './users.model';
import {Model} from 'mongoose'
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private userModel: Model<UsersProps>) { }

    

    async findAll(req,res) {

    }

    async insert(data:UsersProps){
        const curDate = new Date(Date.now())
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        data.createdDate = curDate
        data.updateDate = curDate
        data.password = hash
        const newUser = new this.userModel(data)
        const createdNewUser = new this.userModel(newUser)
        return createdNewUser.save();
    }

    async findById(id: string) {
        return await this.userModel.find({_id:id}).exec();
    }
    
    async updateById(id:string,data: UsersProps){

    }

    async deleteById(id:string){

    }
}
