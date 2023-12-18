// src/product-details/product-details.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { Review } from '../entity/Review'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getProductDetails(productId: number): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id: productId }});
    if (!product) {
      throw new Error('Product not found');
    }

    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['profile'],
    });

    const reviewCustomerPairs = reviews.map(review => ({
      review: review,
      customerName: review.profile.fullname, // Assuming fullname is in Profile entity
      rating: review.rating, // Assuming 'rating' is a field in the Review model
    }));

    return { product, reviewCustomerPairs };
  }
}
