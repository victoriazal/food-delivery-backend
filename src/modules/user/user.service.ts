import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { addFavoriteDish, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { FavoriteDish } from 'src/entities/favoriteDishes.entity';
import { Dish } from 'src/entities/dish.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FavoriteDish)
    private favoriteDishesRepository: Repository<FavoriteDish>,
    @InjectRepository(Dish)
    private dishesRepository: Repository<Dish>,

  ) { }

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email: email } })
  }
  async findUserById(id: number) {
    return this.usersRepository.findOne({ where: { id: id } })
  }
  async createUser(dto: CreateUserDto): Promise<User> {
    dto.password = await this.hashPassword(dto.password)
    const createdUser = this.usersRepository.save({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    })
    return createdUser
  }
  async saveFavoriteDish(dto: addFavoriteDish): Promise<addFavoriteDish> {
    // searching for user with id of the logged in user and the dish this user liked
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    const dish = await this.dishesRepository.findOne({ where: { id: dto.dishId } });
    if (!user || !dish) {
      throw new Error('User or dish not found');
    }
    const favoriteDish = new FavoriteDish();
    favoriteDish.user = user;
    favoriteDish.dish = dish;
    await this.favoriteDishesRepository.save(favoriteDish);
    return dto;
  }
  async deleteFavoriteDish(dto: addFavoriteDish): Promise<addFavoriteDish> {
    // searching for user with id of the logged in user and the dish this user liked
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    const dish = await this.dishesRepository.findOne({ where: { id: dto.dishId } });
    if (!user || !dish) {
      throw new Error('User or dish not found');
    }
    const favoriteDish = new FavoriteDish();
    favoriteDish.user = user;
    favoriteDish.dish = dish;
    await this.favoriteDishesRepository.delete(favoriteDish);
    return dto;
  }


  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async publicUser(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email'], // exclude password field
    });
  }


  async getFavoriteDishesByUserId(userId: number): Promise<FavoriteDish[]> {
    return this.favoriteDishesRepository.find({
      where: { user: { id: userId } },
      relations: ['dish'],
    });
  }
}