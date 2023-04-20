import { Repository, EntityRepository } from 'typeorm';
import { Courier } from './courier.entity';

@EntityRepository(Courier)
export class CourierRepository extends Repository<Courier> {}