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

import { Roles } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private agenciesService: AgenciesService) {}

  @Roles('view_agency')
  @Get()
  findAll(): Promise<Agency[]> {
    return this.agenciesService.findAll();
  }

  @Roles('view_agency')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Agency> {
    return this.agenciesService.findOne(id);
  }

  @Roles('create_agency')
  @Post()
  create(agency: AgencyCreate): Promise<Agency> {
    return this.agenciesService.create(agency);
  }

  @Roles('update_agency')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() agency: AgencyUpdate,
  ): Promise<Agency> {
    agency.id = id;
    return this.agenciesService.update(agency);
  }

  @Roles('delete_agency')
  @Delete(':id')
  softDelete(id: number): Promise<void> {
    return this.agenciesService.softDelete(id);
  }

  @Roles('delete_agency')
  @Delete(':id/hard')
  hardDelete(id: number): Promise<void> {
    return this.agenciesService.hardDelete(id);
  }
}
