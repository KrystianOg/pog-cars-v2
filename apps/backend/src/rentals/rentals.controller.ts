import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { Rental } from './rentals.schema';

@ApiTags('Rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}
  /**
   * all rentals for given user
   */
  @Get()
  findAll(): Promise<Rental[]> {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rental> {
    return this.rentalsService.findOne(id);
  }
}
