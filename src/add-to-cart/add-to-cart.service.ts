// src/add-to-cart/add-to-cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product'; // Update with correct path
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path

@Injectable()
export class AddToCartService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async addToCart(productId: number, profileId: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const profile = await this.profileRepository.findOne({ where: { id: profileId } });
    if (!profile) {
      throw new Error('Profile not found');
    }

    let cartItem = await this.cartItemRepository.findOne({
        where: { 
            profile: { id: profile.id },  // assuming 'profile' is a relation
            product: { id: product.id },  // assuming 'product' is a relation
            is_ordered: false 
          }
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await this.cartItemRepository.save(cartItem);
    } else {
      await this.cartItemRepository.save({
        profile: profile,
        product: product,
        quantity: 1,
        is_ordered: false
      });
    }
  }
}
