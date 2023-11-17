import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  productImage: string;
}
