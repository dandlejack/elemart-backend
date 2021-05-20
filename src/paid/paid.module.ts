import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/product.model';
import { PaidController } from './paid.controller';
import { PaidSchema } from './paid.model';
import { PaidService } from './paid.service';

@Module({
    imports : [MongooseModule.forFeature([{ name: 'paid', schema: PaidSchema }], 'paid'),
    MongooseModule.forFeature([{name:'product', schema:ProductSchema}], 'product'),],
    controllers: [PaidController],
    providers: [PaidService]
  })
export class PaidModule {}
