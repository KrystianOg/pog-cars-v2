import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
// import * as csrf from 'csrf-csrf';
// import { NotImplementedException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });
  app.use(cookieParser());
  // const { doubleCsrfProtection } = csrf.doubleCsrf({
  //   getSecret: () => {
  //     throw new NotImplementedException();
  //   },
  // });
  // app.use(doubleCsrfProtection);

  const config = new DocumentBuilder()
    .setTitle('POG cars API docs')
    .setDescription('POG cars example api description')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8000);
}
bootstrap();
