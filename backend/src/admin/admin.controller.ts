import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProducerInfo } from './producer.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    const userdata = req.user;
    delete userdata['role'];
    delete userdata['createdAt'];
    delete userdata['updatedAt'];
    return userdata;
  }

  @Get('producer')
  getHello(): string {
    return this.adminService.getHello();
  }
  @Post('producer')
  addProducer(@Body() producerInfo: ProducerInfo): object {
    return this.adminService.addProducer(producerInfo);
  }
  @Get('searchproducer')
  searchProducer(@Query('name') name: string, @Query('id') id: number): object {
    return this.adminService.searchProducer(name, id);
  }
  @Put('producer/:id')
  updateProducer(@Param('id') id: number): string {
    return this.adminService.updateProducer(id);
  }
  @Delete('producer/:id')
  deleteProducer(@Param('id') id: number): string {
    return this.adminService.deleteProducer(id);
  }
}
