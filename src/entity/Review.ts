import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Profile } from './Profile'; // Update import path as needed
import { Product } from './Product'; // Update import path as needed

@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('int')
  rating: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile' })
  profile: Profile;
}
