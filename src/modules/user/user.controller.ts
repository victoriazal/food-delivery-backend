import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { FavoriteDish } from 'src/entities/favoriteDishes.entity';
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
  }
  @Post('like')
  like(@Body() dto: addFavoriteDish): Promise<addFavoriteDish> {
    return this.userService.saveFavoriteDish(dto)
  }
  @Post('dislike')
  dislike(@Body() dto: addFavoriteDish): Promise<addFavoriteDish> {
    return this.userService.deleteFavoriteDish(dto)
  }

  @Get(':userId/favorite-dishes')
  async getUserFavoriteDishes(@Param('userId') userId: number): Promise<FavoriteDish[]> {
    return this.userService.getFavoriteDishesByUserId(userId);
  }
}