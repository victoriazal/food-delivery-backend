import { Controller, Get, Param, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { CouriersService } from './couriers.service';

@Controller('courier')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) { }

  @Get('all')
  async findAll() {
    return this.couriersService.findAllCouriers();
  }
  @Get(':imagePath')
  async serveImage(@Param('imagePath') imagePath: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', '..', 'public', 'couriers', imagePath);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
}