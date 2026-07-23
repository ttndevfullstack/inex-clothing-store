import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChatroomDocument = HydratedDocument<Chatroom>;

@Schema({ timestamps: true })
export class Chatroom {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  members: string[];

  @Prop({ required: true })
  createdBy: string;
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
