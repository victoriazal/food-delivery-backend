import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Dish } from './dish.entity';

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToOne(() => Dish, dish => dish.orders)
  dish: Dish;
  
  @Column()
  quantity: number;
}