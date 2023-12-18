// src/product-details/product-details.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Review } from '../entity/Review'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { ProductDetailsController } from './product-details.controller';
import { ProductDetailsService } from './product-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, Profile])],
  controllers: [ProductDetailsController],
  providers: [ProductDetailsService],
})
export class ProductDetailsModule {}
