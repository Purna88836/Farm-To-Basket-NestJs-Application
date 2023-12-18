// src/product-details/product-details.controller.ts
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ProductDetailsService } from './product-details.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Get('/product_detail/:product_id')
  @UseGuards(IsAuthenticatedGuard)
  async viewProductDetails(@Param('product_id') productId: number, @Res() res: FastifyReply) {
    try {
      const { product, reviewCustomerPairs } = await this.productDetailsService.getProductDetails(productId);
      res.view('/product_detail.ejs', { product, reviewCustomerPairs }); // Render with the product details view
    } catch (error) {
      console.error(error);
      if (error.message === 'Product not found') {
        res.status(404).send('Product not found');
      } else {
        res.status(500).send('Error occurred');
      }
    }
  }
}
