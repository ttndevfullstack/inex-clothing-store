import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  image: { [key: string]: string }[];

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  storeCode: string;

  @Prop({ type: Array, required: true, default: [] })
  color: string[];

  @Prop({ type: Array, required: true, default: [] })
  size: string[];

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ required: true, default: '' })
  description: string;

  @Prop({ required: true, default: '' })
  detail: string;

  @Prop({ required: true, default: false })
  bestSeller: boolean;

  @Prop({ required: true, default: false })
  newArrival: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
