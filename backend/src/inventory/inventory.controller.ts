import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto, UpdateInventoryDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @Post('addinventory')
  addInventory(@Body() dto: InventoryDto) {
    return this.inventoryService.addproductInventory(dto);
  }
  @Get('viewinventory')
  viewInventory() {
    return this.inventoryService.findAll();
  }
  @Get('/:id')
  getInventoryById(@Param('id') inventoryID: string) {
    return this.inventoryService.findOneById(inventoryID);
  }
  @Put('editinventory/:id')
  editInventory(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.updateInventory(id, dto);
  }
  @Delete('/:id')
  deleteInventory(@Param('id') id: string) {
    return this.inventoryService.deleteInventory(id);
  }
}
