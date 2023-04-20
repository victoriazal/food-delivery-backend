import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password)
    this.usersRepository.save({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    })
    return dto
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
  
  // how not to show password
  // async publicUser(email:string):Promise<User>{
  //   try{
  //     return  this.usersRepository.findOne({
  //       where:{email},
  //       attributes:{exclude:['password']},
  //     })
  //   }catch(e){
  //     throw new Error(e)
  //   }
  // }
}


