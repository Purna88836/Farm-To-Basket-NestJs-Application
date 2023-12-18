// src/order-history/order-history.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderHistoryService } from './order-history.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class OrderHistoryController {
  constructor(private readonly orderHistoryService: OrderHistoryService) {}

  @Get('/order_history')
  @UseGuards(IsAuthenticatedGuard)
  async viewOrderHistory(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const profileId = req.session.userId; // Replace with correct profile ID source
      const { groupedItems, total_amount } = await this.orderHistoryService.getOrderHistory(profileId);

      // Assuming you are using some template engine for rendering
      res.view('/order_history.ejs', { groupedItems, total_price: total_amount });
    } catch (error) {
      console.error(error);
      if (error.message === 'Profile not found') {
        res.status(404).send('Profile not found');
      } else {
        res.status(500).send('Error occurred while fetching order history');
      }
    }
  }
}
