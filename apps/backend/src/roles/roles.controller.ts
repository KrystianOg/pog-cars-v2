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

  @Permissions('view_role')
  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  // @Permissions('view_role')
  // @Get(':id')
  // findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Role> {
  //   return this.rolesService.findOne(id);
  // }

  @Permissions('create_role')
  @Post()
  create(@Body(new ZodValidationPipe(roleCreateSchema)) role: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(role);
  }

  @Permissions('update_role')
  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(roleCreateSchema)) role: CreateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, role);
  }

  @Permissions('delete_role')
  @Delete(':id')
  softDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.rolesService.softDelete(id);
  }

  @Permissions('delete_role')
  @Delete(':id/hard')
  hardDelete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.rolesService.hardDelete(id);
  }
}
