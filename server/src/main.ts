import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import * as session from 'cookie-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // Define CORS
  const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  };

  // Enable CORS
  app.enableCors(corsOptions);
  app.use(cookieParser());

  // Session and Passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server listening on ${process.env.PORT}`);
  });
}
bootstrap();
