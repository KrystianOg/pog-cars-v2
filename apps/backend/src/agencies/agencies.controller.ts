import {
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { Agency, CreateAgencyDto, agencyCreateSchema } from './agencies.schema';

import { Permissions } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/utils/zod/validation.pipe';

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
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Agency> {
    return this.agenciesService.findOne(id);
  }

  @Permissions('create_agency')
  @Post()
  create(
    @Body(new ZodValidationPipe(agencyCreateSchema)) agency: CreateAgencyDto,
  ): Promise<Agency> {
    return this.agenciesService.create(agency);
  }

  @Permissions('update_agency')
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(agencyCreateSchema)) agency: CreateAgencyDto,
  ): Promise<Agency> {
    return this.agenciesService.update(id, agency);
  }

  @Permissions('delete_agency')
  @Delete(':id')
  softDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.agenciesService.softDelete(id);
  }

  @Permissions('delete_agency')
  @Delete(':id/hard')
  hardDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.agenciesService.hardDelete(id);
  }
}
