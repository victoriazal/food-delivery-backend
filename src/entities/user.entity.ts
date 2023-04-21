import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FavoriteDish } from './favoriteDishes.entity';

@Entity({name: 'Users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;
  
  @Column()
  password: string;

  @Column({ default: null })
  refreshToken?: string;

  @OneToMany(() => FavoriteDish, (favoriteDish) => favoriteDish.user)
  favoriteDishes: FavoriteDish[];
}