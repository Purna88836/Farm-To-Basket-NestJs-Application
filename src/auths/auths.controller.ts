// src/auths/auths.controller.ts
import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Get('login')
  getLogin(@Res() res: FastifyReply, @Req() req: FastifyRequest) {
    /*this.viewEngine(res, 'login.ejs', { errorMessage: null });*/
    if (req.session.userId) {
        // User is logged in, destroy the session and redirect to login
        delete req.session.userId;
        res.redirect(302, '/login')
        res.send('You have been logged out. Please login again.');
    } else {
        res.view('/login.ejs', { errorMessage: null })
    }
  }

  @Get('register')
  getRegister(@Res() res: FastifyReply) {
    /*this.viewEngine(res, 'register.ejs', { errorMessage: null });*/
    res.view('/register.ejs', { errorMessage: null })
  }

  @Post('register')
  async postRegister(@Body() body, @Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { username, password, fullname, mail, phone_number, location, is_farmer } = body;
    try {
      await this.authsService.registerUser(username, password, fullname, mail, phone_number, location, is_farmer);
      res.redirect(302, '/login'); // Adjust the redirect URL as needed
    } catch (error) {
      res.send({ errorMessage: 'Registration error' });
    }
  }

  @Post('login')
  async postLogin(@Body() body, @Res() res: FastifyReply, @Req() req: FastifyRequest,) {
    const { username, password } = body;
    try {
      const user = await this.authsService.validateUser(username, password);
      console.log(user);
      if (user) {
        // User authenticated, proceed to user dashboard or home page
        // Implement your session or JWT token logic here if needed
        // User authenticated
        req.session.userId = user.id; // Store user ID in session
        console.log(user.is_farmer);
        if (user.is_farmer) {
          // If the user is a farmer, redirect to the farmer home page
          res.redirect(302,'/farmer_report');
        } else {
          // Otherwise, redirect to a different page (e.g., customer dashboard)
          res.redirect(302, '/product-list');
        }
      } else {
        // Authentication failed, send back an error message
        /*this.viewEngine(res, 'login.ejs', { errorMessage: 'Invalid username or password' });*/
        res.view('/login.ejs', { errorMessage: 'Invalid username or password' })
      }
    } catch (error) {
      console.error(error);
      /*this.viewEngine(res, 'login.ejs', { errorMessage: 'An error occurred. Please try again.' });*/
      res.view('/login.ejs', { errorMessage: 'An error occurred. Please try again.' })
    }
  }
}
