// src/add-to-cart/add-to-cart.controller.ts
import { Controller, Post, Param, Req, Res, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AddToCartService } from './add-to-cart.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class AddToCartController {
  constructor(private readonly addToCartService: AddToCartService) {}

  @Post('/add_to_cart/:product_id')
  @UseGuards(IsAuthenticatedGuard)
  async addProductToCart(
    @Param('product_id') productId: number,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ) {
    try {
      const profileId = req.session.userId; // Adjust based on your session management
      await this.addToCartService.addToCart(productId, profileId);

      res.redirect(302, '/product-list');
    } catch (error) {
      console.error(error);
      if (error.message === 'Product not found' || error.message === 'Profile not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error occurred while adding to cart', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
