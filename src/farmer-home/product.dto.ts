import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}