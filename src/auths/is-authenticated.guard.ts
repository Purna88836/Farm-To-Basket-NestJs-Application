// src/auth/is-authenticated.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    if (request.session && request.session.userId) {
      return true; // User is authenticated
    }

    const response = context.switchToHttp().getResponse<FastifyReply>();
    response.redirect('/login'); // Redirect to home or login page
    response.status(401).send('Not authenticated');
    return false; // User is not authenticated
  }
}
