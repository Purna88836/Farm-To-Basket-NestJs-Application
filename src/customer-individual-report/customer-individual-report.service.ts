// src/customer-individual-report/customer-individual-report.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entity/CartItem'; // Update with correct path
import { Profile } from '../entity/Profile'; // Update with correct path
import { Product } from '../entity/Product'; // Update with correct path

@Injectable()
export class CustomerIndividualReportService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getCustomerIndividualReport(productId: number): Promise<any[]> {
    const soldCartItems = await this.cartItemRepository.find({
      where: { is_ordered: true, product: { id: productId } },
      relations: ['product', 'product.farmer', 'profile'],
    });

    return soldCartItems.map(item => ({
      productImage: item.product.image,
      productName: item.product.name,
      customerName: item.profile.fullname, // Assuming fullname is a field in Profile entity
      customerEmail: item.profile.mail, // Adjust field name as per your Profile entity
      customerNumber: item.profile.phone_number, // Adjust field name as per your Profile entity
      customerLocation: item.profile.location // Adjust field name as per your Profile entity
      // Add any other necessary fields here
    }));
  }
}
