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
import { RolesService} from './roles.service';
import { Role, CreateRoleDto} from './roles.schema';

import { Permissions } from '../roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/utils/zod/validation.pipe';
import { roleCreateSchema } from './roles.schema';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Permissions('manage_roles')
  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  // @Permissions('view_role')
  // @Get(':id')
  // findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Role> {
  //   return this.rolesService.findOne(id);
  // }

  @Permissions('manage_roles')
  @Post()
  create(@Body(new ZodValidationPipe(roleCreateSchema)) role: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(role);
  }

  @Permissions('manage_roles')
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(roleCreateSchema)) role: CreateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, role);
  }

  @Permissions('manage_roles')
  @Delete(':id')
  softDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.rolesService.softDelete(id);
  }

  @Permissions('manage_roles')
  @Delete(':id/hard')
  hardDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.rolesService.hardDelete(id);
  }
}
