import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Sse,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request, Response } from 'express';

type SignIn = {
  email: string;
  password: string;
};

enum EventName {
  VERIFY_EMAIL = 'verify-email',
}

const targetClient = (eventName: EventName, key: string) =>
  `${eventName}:${key}`;

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private eventEmitter: EventEmitter2,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(
    @Body() signIn: SignIn,
    @Res({ passthrough: true }) response: Response,
  ) {
    const credentials = await this.authService.signIn(signIn);

    response.cookie('refresh_token', credentials.refresh_token, {
      httpOnly: true,
    });

    return {
      access_token: credentials.access_token,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async signUp(@Body() signUp: SignIn): Promise<string> {
    const res = await this.authService.signUp(signUp.email, signUp.password);
    return res.watch_uuid;
  }

  /**
   * @param key is watch_uuid returned by signUp
   */
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('emit')
  verifyEmail(@Query('k') key: string) {
    this.eventEmitter.emit(targetClient(EventName.VERIFY_EMAIL, key), { key });
  }

  /**
   * This method is used to automatically respond to user accepting email invitation
   * @param key is watch_uuid returned by signUp
   */
  @Public()
  @Sse('sse')
  sse(@Query('k') key: string): Observable<MessageEvent> {
    return fromEvent(
      this.eventEmitter,
      targetClient(EventName.VERIFY_EMAIL, key),
    ).pipe(map((data) => new MessageEvent(EventName.VERIFY_EMAIL, { data })));
  }
}
