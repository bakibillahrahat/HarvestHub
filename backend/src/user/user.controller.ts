import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('viewusers')
  allUser(): Promise<UserEntity[]> {
    return this.userService.allUser();
  }
  @Get('/:id')
  searchUserBy(@Param('id') userID: number): Promise<UserEntity> {
    let user = this.userService.getUserByID(userID);
    return user;
  }
  @Put('edituser/:id')
  editUser(@Param('id') id: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
