// src/checkout/checkout.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { Notification } from '../entity/Notification'; // Update with correct path

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async processCheckout(profileId: number): Promise<void> {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }});
    if (!profile) {
      throw new Error('Profile not found');
    }

    const cartItems = await this.cartItemRepository.find({
      where: { profile: profile, is_ordered: false },
      relations: ['product', 'product.farmer'],
    });

    for (const item of cartItems) {
      if (item.product.quantity > 1) {
        item.is_ordered = true;
        item.product.quantity -= item.quantity;
        await this.productRepository.save(item.product);
        await this.cartItemRepository.save(item);
      } else {
        // Notify the farmer that the product is out of stock
        item.is_ordered = true;
        item.product.quantity -= item.quantity;
        await this.productRepository.save(item.product);
        await this.cartItemRepository.save(item);

        const farmerId = item.product.farmer instanceof Profile ? item.product.farmer.id : item.product.farmer;
        //const farmer = await this.profileRepository.findOne({ where: { id: farmerId } });
        const farmer = item.product.farmer;
        
        //const farmer = await this.profileRepository.findOne({ where: { id: item.product.farmer } });
        if (farmer) {
          const message = `Out of stock: ${item.product.name} is no longer available. Please add ${item.product.name} products.`;
          await this.notificationRepository.save({ message, created_at: new Date(), product: item.product, profile: farmer });
        }
      }
    }
  }
}
