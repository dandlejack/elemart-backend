import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { UserController } from 'src/users/users.controller';
import {Model} from 'mongoose'
import { AuthProps } from './auth.model';
import { UsersService } from 'src/users/users.service';
import { UsersProps } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel('users') private userModel: Model<UsersProps>,){}
    async login(req,res) {
      const result = await this.validateUser(req.body.username, req.body.password)
      console.log(result)
      if(result !== null){
        if(result.checking)
        return res.send({
          user: result
        });
      }else{
        res.send({msg:'username or password wrong'})
      }
    }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({username:username}).exec()
        console.log(user)
        if(user){
          const comparePass = await bcrypt.compare(pass, user.password)
          if (user && comparePass) {
            const { password, ...result } = user;
            const data = {
              _id:user._id,
              username:user.username,
              checking:true
            }
            return data;
          }
        }
        return null;
      }
}
