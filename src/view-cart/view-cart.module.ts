// src/view-cart/view-cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { ViewCartController } from './view-cart.controller';
import { ViewCartService } from './view-cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Profile])],
  controllers: [ViewCartController],
  providers: [ViewCartService],
})
export class ViewCartModule {}
