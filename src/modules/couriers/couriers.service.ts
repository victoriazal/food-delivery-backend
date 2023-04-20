import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Courier } from 'src/entities/courier.entity';
@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {}

  async findAllCouriers(): Promise<Courier[]> {
    return await this.courierRepository.find();
  }
  async init() {
    const jsonData = fs.readFileSync('src/moks/couriers.json', 'utf8');
    const couriers = JSON.parse(jsonData);
    for (const courier of couriers) {
      const newCourier = this.courierRepository.create(courier);
      await this.courierRepository.save(newCourier);
    }
  }
}
