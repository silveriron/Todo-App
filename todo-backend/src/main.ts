import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
const express = require('express');
import * as http from 'http';
import * as https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt'),
  };

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    httpsOptions,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Todo App Api')
    .setDescription('The Todo App API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('todos')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();

  http.createServer(server).listen(3001);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
