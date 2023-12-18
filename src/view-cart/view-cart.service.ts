// src/view-cart/view-cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path


interface GroupedCartItem {
    product: Product;
    quantity: number;
    total_price: number;
}

@Injectable()
export class ViewCartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getCartItems(profileId: number): Promise<any> {
    const profile = await this.profileRepository.findOne({ where: { id: profileId } });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const cartItems = await this.cartItemRepository.find({
      where: { profile: profile, is_ordered: false },
      relations: ['product'], // Relations to include
    });

    // Processing the cart items
    const groupedItems = cartItems.reduce((acc: Record<string, GroupedCartItem>, item) => {
      const productId = item.product.id;

      if (!acc[productId]) {
        acc[productId] = {
          product: item.product,
          quantity: 0,
          total_price: 0
        };
      }

      acc[productId].quantity += item.quantity;
      acc[productId].total_price += item.quantity * parseFloat(item.product.price.toString());

      return acc;
    }, {});

    return {
      groupedItemsArray: Object.values(groupedItems),
      total_amount: Object.values(groupedItems).reduce((acc, item) => acc + item.total_price, 0).toFixed(2)
    };
  }
}
