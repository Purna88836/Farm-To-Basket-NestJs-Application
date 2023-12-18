import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from './Profile'; // Adjust the import path as per your project
import { Product } from './Product'; // Adjust the import path as per your project

@Entity('Notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column('date')
  created_at: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile' })
  profile: Profile;
}
