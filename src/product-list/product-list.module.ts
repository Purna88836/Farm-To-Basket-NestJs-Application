import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { ProductListController } from './product-list.controller';
import { ProductListService } from './product-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Profile])],
  controllers: [ProductListController],
  providers: [ProductListService],
})
export class ProductListModule {}
