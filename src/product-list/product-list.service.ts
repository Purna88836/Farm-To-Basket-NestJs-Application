// src/product-list/product-list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path

@Injectable()
export class ProductListService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProfileByUserId(userId: number): Promise<Profile | undefined> {
    return this.profileRepository.findOne({ where: { id: userId } });
  }
}
