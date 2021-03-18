import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }], 'users')],
  providers: [AuthService],  
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
