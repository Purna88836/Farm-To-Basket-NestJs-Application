// src/product-list/product-list.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductListService } from './product-list.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class ProductListController {
  constructor(private readonly productListService: ProductListService) {}

  @Get('/product-list')
  @UseGuards(IsAuthenticatedGuard)
  async showProducts(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const products = await this.productListService.findAllProducts();
      const userId = req.session.userId; // Adjust based on your session management
      const profile = await this.productListService.findProfileByUserId(userId);

      // Manually rendering the view
      console.log(products)
      res.view('/product-list.ejs', {
        products: products,
        customer_name: profile ? profile.fullname : 'Customer',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching products');
    }
  }
}

