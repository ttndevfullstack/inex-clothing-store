import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  receiver: string[];

  @Prop({ default: false })
  isDelete: boolean;

  @Prop({ required: true })
  sendAt: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
    required: true,
  })
  roomId: mongoose.Schema.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
