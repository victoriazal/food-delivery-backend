import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity({ name: 'FavoriteDishes' })
export class FavoriteDish {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favoriteDishes)
  user: User;

  @ManyToOne(() => Dish, dish => dish.favoriteDishes)
  dish: Dish;
}
