import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userSErvice: UserService) {}
  @Get()
  hello() {
    return 'Hello';
  }
  @Patch('update/:id')
  editUser(@Param('id') id: number, @Body() dto: EditUserDto) {
    return this.userSErvice.editUser(id, dto);
  }
}
