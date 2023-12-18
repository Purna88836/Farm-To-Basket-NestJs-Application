// src/customer-reviews/customer-reviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Review } from '../entity/Review'; // Update with correct path
import { CustomerReviewsController } from './customer-reviews.controller';
import { CustomerReviewsService } from './customer-reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review])],
  controllers: [CustomerReviewsController],
  providers: [CustomerReviewsService],
})
export class CustomerReviewsModule {}
