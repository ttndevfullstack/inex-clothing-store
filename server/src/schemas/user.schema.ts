import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/user/roles/roles.enum';
import { Product } from './product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ required: true })
  hashPassword: string;

  @Prop({ default: [] })
  purchasedProducts: Product[];

  @Prop({ require: true, default: Role.User })
  role: Role[];

  @Prop({ default: false })
  VIP: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
