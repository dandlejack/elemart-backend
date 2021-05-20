import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ProductProps } from './product.model';
import { ProductService } from './product.service';
import { Request, Response } from 'express';
@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){
    }
    // @Get('/findall')
    // findAll(@Req() req: Request, @Res() res: Response):Object{
    //         return this.productService.findAll(req,res)
    // }
    @Get('/findall')
     async findAll(@Req() req: Request, @Res() res: Response){
            const result = await this.productService.findAll(req,res)
            res.send(result);             
    }
    @Get('/findAllWithoutParams')
    async findAllWithoutParams(@Req() req: Request, @Res() res: Response){
           const result = await this.productService.findAllWithoutParams(req,res)
           res.send(result);             
   }
    @Get('/:id')
    findById(@Param('id') id:string){
        const p = this.productService.findById(id)
        return p      
    }

    @Post()
    insert(@Body() data:any){
        return this.productService.insert(data)
    }

    @Put('/:id')
    updateById(@Param('id') id:string ,@Body() data:ProductProps){
        return this.productService.updateById(id,data)
    }

    @Delete('/:id')
    deleteById(@Param('id') id:string){
        return this.productService.deleteById(id)
    }
}
