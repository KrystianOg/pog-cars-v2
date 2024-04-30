import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car, CarCreate, CarUpdate } from './cars.schema';

import { Roles } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Roles('view_car')
  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Roles('view_car')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Roles('create_car')
  @Post()
  create(car: CarCreate): Promise<Car> {
    return this.carsService.create(car);
  }

  @Roles('update_car')
  @Patch(':id')
  update(@Param('id') id: number, @Body() car: CarUpdate): Promise<Car> {
    car.id = id;
    return this.carsService.update(car);
  }

  @Roles('delete_car')
  @Delete(':id')
  softDelete(id: number): Promise<void> {
    return this.carsService.softDelete(id);
  }

  @Roles('delete_car')
  @Delete(':id/hard')
  hardDelete(id: number): Promise<void> {
    return this.carsService.hardDelete(id);
  }
}
