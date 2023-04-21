import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { addFavoriteDish, UpdateUserDto } from './dto/user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request) {
    const user = request.user
    console.log(user)
  }
  @Post('like')
  like(@Body() dto: addFavoriteDish): Promise<addFavoriteDish> {
    return this.userService.saveFavoriteDish(dto)
  }
}
