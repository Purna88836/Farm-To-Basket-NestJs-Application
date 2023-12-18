// src/app.controller.ts (or any other controller file)

import { Controller, Get, Req, Res} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class AppController {
  @Get()
  redirectToLogin(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    // This function can be empty as @Redirect() will handle the redirection
    res.redirect(302, '/login');
  }
}
