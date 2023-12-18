// src/add-to-cart/add-to-cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { AddToCartController } from './add-to-cart.controller';
import { AddToCartService } from './add-to-cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CartItem, Profile])],
  controllers: [AddToCartController],
  providers: [AddToCartService],
})
export class AddToCartModule {}
