import { Body, Controller, Get, Post, Req, Res, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get('/list')
    async list(@Res() res) {
        var data = await this.productService.list();
        return res.status(data.statusCode).json({ status: data.statusCode, message: data.message, data: data.data, error: data.error });
    }

    @Get('check-discount/:product_id/:discount_title')
    async checkDiscountForProduct(@Param('product_id') product_id, @Param('discount_title') discount_title, @Res() res) {
        var data = await this.productService.checkDiscountForProduct(product_id, discount_title);
        return res.status(data.statusCode).json({ status: data.statusCode, message: data.message, data: data.data, error: data.error });
    }
}
