import {Controller, Get, Param, Res} from '@nestjs/common';
import { DishService } from './dish.service';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get('all')
  async findAll() {
    return this.dishService.findAllDishes();
  }
  @Get(':imagePath')
  async serveImage(@Param('imagePath') imagePath: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..','..','..', 'public', 'food', imagePath);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
}