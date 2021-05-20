import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { PaidSchema } from 'src/paid/paid.model';
import { ReceivedSchema } from 'src/received/received.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'product', schema:ProductSchema}], 'product'),
          MongooseModule.forFeature([{name:'paid', schema:PaidSchema}],'paid'),
          MongooseModule.forFeature([{name:'received', schema:ReceivedSchema}],'received')],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
