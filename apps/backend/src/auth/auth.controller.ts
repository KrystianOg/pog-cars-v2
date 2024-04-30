import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

type SignIn = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn.email, signIn.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUp: SignIn) {
    return this.authService.signUp(signUp.email, signUp.password);
  }

  @Get('profile')
  getProfile(@Request() req: unknown) {
    // FIXME: type of request here
    // @ts-expect-error req is unknown for now will change it later
    return req.user;
  }
}
