import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Productdto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  description: string;
}
