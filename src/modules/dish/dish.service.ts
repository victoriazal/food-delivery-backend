import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Dish } from 'src/entities/dish.entity';
@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) { }

  async findAllDishes(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }
  async init() {
    const jsonData = fs.readFileSync('src/moks/dishes.json', 'utf8');
    const dishes = JSON.parse(jsonData);
    for (const dish of dishes) {
      const newDish = this.dishRepository.create(dish);
      await this.dishRepository.save(newDish);
    }
  }
}
