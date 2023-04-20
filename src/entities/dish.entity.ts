import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}