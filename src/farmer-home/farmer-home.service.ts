import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { Profile } from '../entity/Profile';
import { CartItem } from '../entity/CartItem';
import { Notification } from '../entity/Notification';

// Interface for the structure of the sold product report
interface SoldProductReport {
  productId: number;
  productName: string;
  quantitySold: number;
  productPrice: number;
  totalAmount: number;
}

@Injectable()
export class FarmerHomeService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}

  async getFarmerReport(userId: number) {
    const ownedProducts = await this.productRepository.find({
      where: { farmer: { id: userId } },
    });

    console.log(ownedProducts)

    const ownedproductsreport = ownedProducts.map(product => {
      return {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        totalAmount: product.getTotalAmount(), // Assuming totalAmount method exists in Product entity
      };
    });

    const farmerProfile = await this.profileRepository.findOne({
      where: { id: userId },
    });

    // Compute chart data
    const chartData = await this.computeChartData(userId);
    const notifications = await this.fetchFarmerNotifications(userId);

    const soldproductsreport = await this.getSoldProductsReport(userId);
    let totalOwe = soldproductsreport.reduce((total, item) => {
        return total + item.totalAmount;
      }, 0);

    return { ownedproductsreport, farmerProfile, soldproductsreport, totalOwe, chartData, notifications };
  }

  async getSoldProductsReport(farmerId: number): Promise<SoldProductReport[]> {
    const soldProducts = await this.cartItemRepository.find({
      where: { is_ordered: true },
      relations: ['product', 'product.farmer'],
    });

    //console.log("soldproducts logs......",soldProducts);

    const filteredSoldProducts = soldProducts.filter(item => {
        return item.product && item.product.farmer && item.product.farmer.id === farmerId;
        //return item.profile && item.profile.id === farmerId;
    });

    //console.log("soldproducts logs......",filteredSoldProducts);

    //const filteredSoldProducts = soldProducts.filter(item => item.product.farmer.id === farmerId);

    const groupedSoldProducts: Record<string, SoldProductReport> = filteredSoldProducts.reduce((acc, item) => {
      const productName = item.product.name;

      if (!acc[productName]) {
        acc[productName] = {
          productId: item.product.id,
          productName,
          quantitySold: 0,
          productPrice: item.product.price,
          totalAmount: 0,
        };
      }

      acc[productName].quantitySold += item.quantity;
      acc[productName].totalAmount += item.quantity * item.product.price;

      return acc;
    }, {});

    return Object.values(groupedSoldProducts).filter(product => product.quantitySold > 0);
  }



  async computeChartData(farmerId: number) {
    try {
      const products = await this.productRepository.find({
        where: { farmer: { id: farmerId } },
      });

      let productNames = [];
      let totalEarned = [];
      let actualQuantities = [];
      let soldQuantities = [];

      for (const product of products) {
        const soldItemsCount = await this.cartItemRepository.count({
          where: {
            product: { id: product.id },
            is_ordered: true
          }
        });

        const totalAmount = product.price * soldItemsCount;
        const actualQuantity = product.quantity + soldItemsCount;

        productNames.push(product.name);
        totalEarned.push(totalAmount);
        actualQuantities.push(actualQuantity);
        soldQuantities.push(soldItemsCount);
      }

      return { productNames, totalEarned, actualQuantities, soldQuantities };
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred while computing chart data');
    }
  }


  async fetchFarmerNotifications(farmerId: number) {
    try {
      const notifications = await this.notificationRepository.find({
        where: { profile: { id: farmerId } },
        relations: ['product']
      });

      return notifications.map(notification => ({
        message: notification.message,
        product: {
          name: notification.product.name,
          image: {
            url: notification.product.image
          }
        }
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  async addProduct(userId: number, name: string, description: string, category: string, quantity: number, price: number, imagePath: string) {
    //console.log(productData);
    const farmerProfile = await this.profileRepository.findOne({ where: { id: userId } });
    if (!farmerProfile) {
        throw new Error('Farmer profile not found');
    }
    await this.productRepository.save({
      name: name,
      description: description,
      category: category,
      quantity: quantity,
      price: price,
      image: imagePath,
      farmer: farmerProfile,
    });
  }

  // ... other methods ...
}
