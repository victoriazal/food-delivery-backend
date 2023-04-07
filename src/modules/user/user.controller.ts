import { Body, Controller, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private  readonly userService: UserService){}

  @Post('signUp')
  async createUsers(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }
}
