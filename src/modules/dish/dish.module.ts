import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from 'src/entities/dish.entity';
import { DishRepository } from 'src/entities/dish.repository';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishRepository])],
  providers: [DishService],
  controllers:[DishController],
})
export class DishModule implements OnModuleInit {
  constructor(private readonly dishService: DishService) {}
  async onModuleInit() {
    await this.dishService.init();
  }
}
