// src/customer-individual-report/customer-individual-report.controller.ts
import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomerIndividualReportService } from './customer-individual-report.service';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';

@Controller()
export class CustomerIndividualReportController {
  constructor(private readonly customerIndividualReportService: CustomerIndividualReportService) {}

  @Get('/customer_individual_report/:product_id')
  @UseGuards(IsAuthenticatedGuard)
  async viewCustomerIndividualReport(
    @Param('product_id') productId: number,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply
  ) {
    try {
      const customerReport = await this.customerIndividualReportService.getCustomerIndividualReport(productId);

      // Assuming you are using some template engine for rendering
      res.view('customer_individual_report.ejs', { customers: customerReport });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while fetching customer report');
    }
  }
}
