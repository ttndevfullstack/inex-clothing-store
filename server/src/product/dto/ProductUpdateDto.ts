import { IsArray } from 'class-validator';

export class ProductUpdateDto {
  name?: string;
  type?: string;
  quantity?: number;
  price?: string;
  storeCode?: string;
  description?: string;
  detail?: string;
  bestSeller?: boolean;
  newArrival?: boolean;

  @IsArray()
  image: { color: string; image: string }[];
  @IsArray()
  color?: string[];
  @IsArray()
  size?: string[];
}
