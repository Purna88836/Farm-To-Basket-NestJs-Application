// src/customer-reviews/customer-reviews.controller.ts
import { Controller, Get, Post, Param, Body, Req, Res, UseGuards, Render, Redirect } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomerReviewsService } from './customer-reviews.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class CustomerReviewsController {
  constructor(private readonly customerReviewsService: CustomerReviewsService) {}

  @Get('/add_review/:product_id')
  @UseGuards(IsAuthenticatedGuard)
  async getAddReviewPage(@Param('product_id') productId: number, @Res() res: FastifyReply) {
    const product = await this.customerReviewsService.findProduct(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    res.view('/add_review.ejs', { productName: product.name, productId });
  }

  @Post('/add_review/:product_id')
  @UseGuards(IsAuthenticatedGuard)
  async addReview(
    @Param('product_id') productId: number,
    @Req() req: FastifyRequest,
    @Body('rating') rating: number,
    @Body('review') review: string,
    @Res() res: FastifyReply
  ) {
    const userId = req.session.userId; // Assuming user ID is stored in session
    await this.customerReviewsService.addReview(productId, userId, rating, review);
    res.redirect(302, '/product-list');
  }
}
