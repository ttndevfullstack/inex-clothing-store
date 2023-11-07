import { Product } from 'src/schemas/product.schema';
import { Role } from '../roles/roles.enum';

export class UserReturnDto {
  username: string;
  email: string;
  avatar: string;
  purchasedProducts: Product[];
  role: Role[];
  VIP: boolean;
}
