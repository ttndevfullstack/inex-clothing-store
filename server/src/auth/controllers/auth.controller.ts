import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Get,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthRegisterDto } from '../dto/AuthRegisterDto';
import { AuthLoginDto } from '../dto/AuthLoginDto';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from '../guard/google.guard';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Res() response: Response, @Body() authDto: AuthRegisterDto) {
    return this.authService.register(response, authDto);
  }

  @Post('login')
  login(@Res() response: Response, @Body() authDto: AuthLoginDto) {
    return this.authService.login(response, authDto);
  }

  @Post('authorization')
  authorization(@Body() credentials) {
    return this.authService.authorization(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('login/sso')
  loginWithAccessToken(@Req() request: Request, @Res() response: Response) {
    return this.authService.loginWithAccessToken(request, response);
  }

  // @Get('google')
  // @UseGuards(GoogleAuthGuard)
  // googleLogin(@Res() res: Response) {
  //   return res.status(HttpStatus.OK).json('Login with google');
  // }

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // googleLoginRedirect(@Req() req, @Res() res: Response) {
  //   if (!req.user) return;
  //   res.redirect('http://localhost:3000');
  //   res.cookie('token', 'token');
  //   return res
  //     .status(HttpStatus.OK)
  //     .json({ message: 'Login with Google success', user: req.user });
  // }
}
