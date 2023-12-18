
// src/checkout/checkout.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { Notification } from '../entity/Notification'; // Update with correct path
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, Profile, Notification])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
