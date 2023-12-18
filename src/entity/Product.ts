import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from './Profile'; // Update import path as needed

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('text', { nullable: true, default: 'media/' })
  image: string;

  @Column({
    type: 'enum',
    enum: ['fruits', 'vegetables', 'dairy products', 'grains']
  })
  category: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'farmer' })
  farmer: Profile;

  getTotalAmount() {
    return this.price * this.quantity;
  }
}
