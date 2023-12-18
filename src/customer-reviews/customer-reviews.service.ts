// src/customer-reviews/customer-reviews.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Review } from '../entity/Review'; // Update with correct path

@Injectable()
export class CustomerReviewsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findProduct(productId: number): Promise<Product | undefined> {
    return await this.productRepository.findOne({ where: { id: productId }});
  }

  async addReview(productId: number, userId: number, rating: number, content: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: productId }});
    if (!product) {
      throw new Error('Product not found');
    }

    const newReview = this.reviewRepository.create({
      product: product,
      profile: { id: userId }, // Assuming Review entity references Profile entity
      rating,
      content,
    });

    await this.reviewRepository.save(newReview);
  }
}
