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

import { Permissions } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Permissions('view_cars')
  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Permissions('view_cars')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Permissions('manage_cars')
  @Post()
  create(car: CarCreate): Promise<Car> {
    return this.carsService.create(car);
  }

  @Permissions('manage_cars')
  @Patch(':id')
  update(@Param('id') id: number, @Body() car: CarUpdate): Promise<Car> {
    car.id = id;
    return this.carsService.update(car);
  }

  @Permissions('manage_cars')
  @Delete(':id')
  softDelete(id: number): Promise<void> {
    return this.carsService.softDelete(id);
  }

  @Permissions('manage_cars')
  @Delete(':id/hard')
  hardDelete(id: number): Promise<void> {
    return this.carsService.hardDelete(id);
  }
}
