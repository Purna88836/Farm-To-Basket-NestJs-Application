import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerHomeController } from './farmer-home.controller';
import { FarmerHomeService } from './farmer-home.service';
import { Product } from '../entity/Product';
import { Profile } from '../entity/Profile';
import { CartItem } from '../entity/CartItem';
import { Notification } from '../entity/Notification';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Profile, CartItem, Notification])],
  controllers: [FarmerHomeController],
  providers: [FarmerHomeService],
})
export class FarmerHomeModule {}
