// src/order-history/order-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/CartItem';
import { Profile } from '../entity/Profile';
import { OrderHistoryController } from './order-history.controller';
import { OrderHistoryService } from './order-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Profile])],
  controllers: [OrderHistoryController],
  providers: [OrderHistoryService],
})
export class OrderHistoryModule {}
