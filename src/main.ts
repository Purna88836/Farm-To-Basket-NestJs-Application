import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyView from '@fastify/view';
import * as ejs from 'ejs';
import * as path from 'path';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import { AppDataSource } from './Data-Source-Config/app-data-source';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from 'fastify-multipart';

async function bootstrap() {


  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyView, {
    engine: {
      ejs: ejs,
    },
    root: path.join(__dirname, '..', 'views'),
    includeViewExtension: true,
  });

  // Register the multipart plugin
  app.register(fastifyMultipart);

  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'), // Path to your static files
    prefix: '/public/', // Optional: Prefix for the static files URL
    decorateReply: false 
  });



  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'uploads'), // Path to your static files
    prefix: '/uploads/', 
    decorateReply: false 
  });


  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    secret: 'hfyrurorojjkoror994849949494989,lkuu[][iu890746547dhhhdjjiieu7748489urhejjrurururu',
    cookie: { secure: false },
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
