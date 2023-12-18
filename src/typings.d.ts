// src/typings.d.ts
import { FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { Multipart } from 'fastify-multipart';

declare module 'fastify' {
  interface FastifyRequest {
    file: Multipart['file'];
  }
}
