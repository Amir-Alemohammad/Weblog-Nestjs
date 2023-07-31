import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  //static folders
  app.useStaticAssets(join(process.cwd(), "public"))

  app.use(cookieParser()); // cookie parser middleware
  
  app.useGlobalPipes(new ValidationPipe({ // validation

    whitelist: true, //  For additional and duplicate fields
    
  }));
  
  await app.listen(process.env.PORT);
}
bootstrap();
