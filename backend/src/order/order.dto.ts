import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  userid: string;
}

export class OrderItemDto {
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  @IsString()
  orderId: string;
  @IsNotEmpty()
  @IsString()
  productId: string;
}
