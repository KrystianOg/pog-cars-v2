import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import type { AgencyCreate, AgencyUpdate } from './agencies.schema';

@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @Get()
  findAll() {
    return this.agenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.agenciesService.findOne(id);
  }

  @Post()
  create(agency: AgencyCreate) {
    return this.agenciesService.create(agency);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() agency: AgencyUpdate) {
    agency.id = id;
    return this.agenciesService.update(agency);
  }

  @Delete(':id')
  softDelete(id: number) {
    return this.agenciesService.softDelete(id);
  }

  @Delete(':id/hard')
  hardDelete(id: number) {
    return this.agenciesService.hardDelete(id);
  }
}
