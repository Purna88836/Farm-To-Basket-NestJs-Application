// src/customer-individual-report/customer-individual-report.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path
import { CustomerIndividualReportController } from './customer-individual-report.controller';
import { CustomerIndividualReportService } from './customer-individual-report.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Profile, Product])],
  controllers: [CustomerIndividualReportController],
  providers: [CustomerIndividualReportService],
})
export class CustomerIndividualReportModule {}
