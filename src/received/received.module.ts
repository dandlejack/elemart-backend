import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/product.model';
import { ReceivedController } from './received.controller';
import { ReceivedSchema } from './received.model';
import { ReceivedService } from './received.service';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'received', schema: ReceivedSchema }], 'received'),
  MongooseModule.forFeature([{name:'product', schema:ProductSchema}], 'product'),],
  controllers: [ReceivedController],
  providers: [ReceivedService]
})
export class ReceivedModule {}
