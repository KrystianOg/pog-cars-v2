import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../roles/roles.decorator';
import { UserUpdate } from './users.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // view self
  // view others
  // invite others to agency

  @Roles('view_self')
  @Get()
  findSelf() {
    return this.usersService.findSelf();
  }

  @Roles('view_user')
  @Get(':id')
  findOne(@Param('id') id: number) {
    // TODO: change this to also allow find by id
    return this.usersService.findOne(id);
  }

  // TODO: change the UserUpdate type
  @Roles('update_user')
  @Patch(':id')
  update(@Param('id') id: number, @Body() user: UserUpdate) {
    user.id = id;
    return this.usersService.update(user);
  }
}
