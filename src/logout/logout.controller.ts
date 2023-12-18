// src/logout/logout.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class LogoutController {
  @Get('/logout')
  async logout(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    try {
      // Assuming you are using a session management mechanism compatible with Fastify

      // Delete the session data
      if (req.session) {
        delete req.session.userId;
      }
      // Redirect to home page or login page after logout
      res.redirect(302, '/login');
    } catch (error) {
      console.error("Error during logout: ", error);
      res.status(500).send('Error occurred during logout');
    }
  }
}
