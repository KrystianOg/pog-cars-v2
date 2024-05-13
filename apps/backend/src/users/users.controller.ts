import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Permissions } from '../roles/roles.decorator';
import { UserUpdate } from './users.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // TODO: check if user is self or has permission
  @Permissions('view_all_users')
  @Get(':id')
  findOne(@Param('id') id: number) {
    // TODO: change this to also allow find by id
    return this.usersService.findOne(id);
  }

  // TODO: change the UserUpdate type
  @Permissions('modify_all_users') // TODO: or is self
  @Patch(':id')
  update(@Param('id') id: number, @Body() user: UserUpdate) {
    user.id = id;
    return this.usersService.update(user);
  }
}
