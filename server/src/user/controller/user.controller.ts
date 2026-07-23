import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserUpdateDto } from '../dto/UserUpdateDto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { UserService } from '../service/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin, Role.Manager)
  @Get('list')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('members')
  getAllMembers() {
    return this.userService.getAllMembers();
  }

  @UseGuards(AuthGuard)
  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  @Roles(Role.Admin)
  @Put(':email')
  updateUser(@Param('email') email: string, @Body() userDto: UserUpdateDto) {
    return this.userService.updateUser(email, userDto);
  }

  @Roles(Role.Admin)
  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
