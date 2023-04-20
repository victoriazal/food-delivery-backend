import { Repository, EntityRepository } from 'typeorm';
import { Dish } from './dish.entity';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {}