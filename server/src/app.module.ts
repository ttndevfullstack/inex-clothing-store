import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RolesGuard } from './user/roles/roles.guard';
import { UserModule } from './user/user.module';
import { PusherService } from './pusher/pusher.service';
import { PusherController } from './pusher/pusher.controller';
import { MessageModule } from './message/message.module';
import { StripeModule } from './stripe/stripe.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/service/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    ProductModule,
    MessageModule,
    MailModule,
    ChatroomModule,
  ],
  controllers: [AppController, PusherController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    PusherService,
    MailService,
  ],
})
export class AppModule {}
