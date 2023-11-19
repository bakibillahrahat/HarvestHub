import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InventoryDto {
  @IsNotEmpty()
  @IsNumber()
  stockLevel: number;
  @IsNotEmpty()
  @IsString()
  productid: string;
}

export class UpdateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  stockLevel: number;
}
