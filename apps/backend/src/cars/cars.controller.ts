import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car, carSchema, CreateCarDto } from './cars.schema';
import { Permissions } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../utils/zod/validation.pipe';
import { Pagination, paginationSchema } from '../utils/zod/pagination.schema';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @HttpCode(HttpStatus.OK)
  @Permissions('view_cars')
  @Get()
  findAll(
    @Query(new ZodValidationPipe(paginationSchema)) params: Pagination,
    orderBy: keyof Car,
  ): Promise<Car[]> {
    return this.carsService.findAll(params, orderBy);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions('view_cars')
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Permissions('manage_cars')
  @Post()
  create(
    @Body(new ZodValidationPipe(carSchema)) car: CreateCarDto,
  ): Promise<Car> {
    return this.carsService.create(car);
  }

  @HttpCode(HttpStatus.OK)
  @Permissions('manage_cars')
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(carSchema)) car: CreateCarDto,
  ): Promise<Car> {
    return this.carsService.update(id, car);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('manage_cars')
  @Delete(':id')
  softDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.carsService.softDelete(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('manage_cars')
  @Delete(':id/hard')
  hardDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.carsService.hardDelete(id);
  }
}
