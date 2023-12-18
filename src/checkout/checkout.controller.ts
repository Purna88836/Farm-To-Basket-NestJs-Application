// src/checkout/checkout.controller.ts
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CheckoutService } from './checkout.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/checkout')
  @UseGuards(IsAuthenticatedGuard)
  async checkout(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const profileId = req.session.userId; // Replace with correct profile ID source
      await this.checkoutService.processCheckout(profileId);

      // Assuming you are using some template engine for rendering
      res.view('/checkout.ejs');
    } catch (error) {
      console.error(error);
      if (error.message === 'Profile not found') {
        res.status(404).send('Profile not found');
      } else {
        res.status(500).send('Error during checkout');
      }
    }
  }
}
