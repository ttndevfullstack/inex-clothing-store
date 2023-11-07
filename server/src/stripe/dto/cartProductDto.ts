import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CartProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsArray()
  image: { color: string; image: string }[];

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  storeCode: string;

  @IsArray()
  color: string;

  @IsNotEmpty()
  @IsArray()
  size: string;
}
