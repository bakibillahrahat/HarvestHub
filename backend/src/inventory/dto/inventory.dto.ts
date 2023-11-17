import { IsNotEmpty, IsNumber } from 'class-validator';

export class InventoryDto {
  @IsNotEmpty()
  @IsNumber()
  stocklevel: number;
}
