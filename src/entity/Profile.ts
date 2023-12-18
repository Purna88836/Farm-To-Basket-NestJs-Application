import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column({type: 'boolean', default: false })
  is_farmer: boolean;

  @Column('text')
  fullname: string;

  @Column('text')
  mail: string;

  @Column('text')
  phone_number: string;

  @Column('text')
  location: string;
}
