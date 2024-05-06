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
import type { Agency, AgencyCreate, AgencyUpdate } from './agencies.schema';

import { Permissions } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @Permissions('view_agency')
  @Get()
  findAll(): Promise<Agency[]> {
    return this.agenciesService.findAll();
  }

  @Permissions('view_agency')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Agency> {
    return this.agenciesService.findOne(id);
  }

  @Permissions('create_agency')
  @Post()
  create(agency: AgencyCreate): Promise<Agency> {
    return this.agenciesService.create(agency);
  }

  @Permissions('update_agency')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() agency: AgencyUpdate,
  ): Promise<Agency> {
    agency.id = id;
    return this.agenciesService.update(agency);
  }

  @Permissions('delete_agency')
  @Delete(':id')
  softDelete(id: number): Promise<void> {
    return this.agenciesService.softDelete(id);
  }

  @Permissions('delete_agency')
  @Delete(':id/hard')
  hardDelete(id: number): Promise<void> {
    return this.agenciesService.hardDelete(id);
  }
}
