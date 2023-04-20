import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Courier'})
export class Courier {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  profession: string;

  @Column()
  image: string;
}