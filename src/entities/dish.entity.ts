import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FavoriteDish } from './favoriteDishes.entity';
import { Order } from './orders.entity';

@Entity({name: 'Dish'})
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortDescription: string;
  
  @Column()
  about: string;

  @Column()
  rating: string;

  @Column()
  time: string

  @Column()
  price: string;

  @Column()
  image: string;

  @OneToMany(() => FavoriteDish, (favoriteDish) => favoriteDish.user)
  favoriteDishes: FavoriteDish[];

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];
}