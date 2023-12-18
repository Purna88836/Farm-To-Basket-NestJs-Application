// src/view-cart/view-cart.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ViewCartService } from './view-cart.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class ViewCartController {
  constructor(private readonly viewCartService: ViewCartService) {}

  @Get('/cart')
  @UseGuards(IsAuthenticatedGuard)
  async viewCart(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const profileId = req.session.userId; // Adjust based on session management
      const { groupedItemsArray, total_amount } = await this.viewCartService.getCartItems(profileId);

      // Assuming you are using some template engine for rendering
      res.view('/cart.ejs', { cart_items: groupedItemsArray, total_price: total_amount });
    } catch (error) {
      console.error(error);
      if (error.message === 'Profile not found') {
        res.status(404).send('Profile not found');
      } else {
        res.status(500).send('Error occurred while fetching cart items');
      }
    }
  }
}
