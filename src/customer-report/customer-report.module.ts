// src/customer-report/customer-report.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path
import { CustomerReportController } from './customer-report.controller';
import { CustomerReportService } from './customer-report.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Profile, Product])],
  controllers: [CustomerReportController],
  providers: [CustomerReportService],
})
export class CustomerReportModule {}
