import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courier } from 'src/entities/courier.entity';
import { CourierRepository } from 'src/entities/courier.repository';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './couriers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Courier, CourierRepository])],
  controllers: [CouriersController],
  providers: [CouriersService],
})
export class CouriersModule implements OnModuleInit {
  constructor(private readonly couriersService: CouriersService) { }
  async onModuleInit() {
    await this.couriersService.init();
  }
}

