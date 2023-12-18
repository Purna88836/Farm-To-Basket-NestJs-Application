// src/order-history/order-history.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/CartItem';
import { Product } from '../entity/Product';
import { Profile } from '../entity/Profile';

interface GroupedCartItem {
    product: Product;
    quantity: number;
    total_price: number;
}

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getOrderHistory(profileId: number): Promise<any> {
    const profile = await this.profileRepository.findOne({ where: { id: profileId }});

    if (!profile) {
      throw new Error('Profile not found');
    }

    const cartItems = await this.cartItemRepository.find({
      where: { profile: profile, is_ordered: true },
      relations: ['product'],
    });

    let groupedItems = cartItems.reduce((acc: Record<string, GroupedCartItem>, item) => {
      const productId = item.product.id;

      if (!acc[productId]) {
        acc[productId] = {
          product: item.product,
          quantity: 0,
          total_price: 0
        };
      }

      acc[productId].quantity += item.quantity;
      acc[productId].total_price += item.quantity * item.product.price;
      return acc;
    }, {});

    const total_price = Object.values(groupedItems).reduce((sum, item) => sum + item.total_price, 0);

    return { groupedItems: Object.values(groupedItems), total_amount: total_price.toFixed(2) };
  }
}
