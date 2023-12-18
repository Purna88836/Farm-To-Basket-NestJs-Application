import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from './Profile'; // Adjust the import path as per your project
import { Product } from './Product'; // Adjust the import path as per your project

@Entity('CartItems')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  is_ordered: boolean;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile' })
  profile: Profile;

  // Calculate total price
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}
