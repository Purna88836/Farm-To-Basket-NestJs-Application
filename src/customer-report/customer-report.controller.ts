// src/customer-report/customer-report.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomerReportService } from './customer-report.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class CustomerReportController {
  constructor(private readonly customerReportService: CustomerReportService) {}

  @Get('/customer_report')
  @UseGuards(IsAuthenticatedGuard)
  async viewCustomerReport(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      const farmerId = req.session.userId; // Replace with correct profile ID source
      const customerReport = await this.customerReportService.getCustomerReport(farmerId);

      // Assuming you are using some template engine for rendering
      res.view('/customer_report.ejs', { customerReport });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching customer report');
    }
  }
}
