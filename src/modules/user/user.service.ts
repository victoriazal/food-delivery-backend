import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
 
  async hashPassword (password){
    return bcrypt.hash(password,10)
  }

  async findUserByEmail(email:string){
    return this.usersRepository.findOne({where:{email:email}})
  }
  async createUser(dto:CreateUserDto):Promise<CreateUserDto>{
      dto.password = await this.hashPassword(dto.password)
       this.usersRepository.save({
        username: dto.username,
        password:dto.password,
        email:dto.email
      })
      return dto
  }
  
}


