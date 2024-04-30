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
import { ApiTags } from '@nestjs/swagger';

type SignIn = {
  email: string;
  password: string;
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
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
