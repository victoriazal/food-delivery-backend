import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/errors';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenSerice: TokenService
  ) { }


  async registerUsers(dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST)
    }
    return this.userService.createUser(dto)
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
    const validatePasswoword = await bcrypt.compare(dto.password, existUser.password)
    if (!validatePasswoword) throw new BadRequestException(AppError.WRONG_DATA)
    const userData = {
      name: existUser.username,
      email: existUser.email
    }
    const token = await this.tokenSerice.generateJwtToken(userData)
    return { ...existUser, token }
  }

}
