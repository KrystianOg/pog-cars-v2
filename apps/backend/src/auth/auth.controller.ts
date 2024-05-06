import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request,
  Sse,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

type SignIn = {
  email: string;
  password: string;
};

enum EventName {
  VERIFY_EMAIL= 'verify-email'
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private eventEmitter: EventEmitter2) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signIn: SignIn, @Req() request: Request) {
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

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('emit')
  verifyEmail() {
    this.eventEmitter.emit(EventName.VERIFY_EMAIL, {id: 1})
  }

  @Public()
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, EventName.VERIFY_EMAIL).pipe(
      map((data) => {const event = new MessageEvent(EventName.VERIFY_EMAIL, {data: JSON.stringify({success: true})}) 
      console.log('data', data)
        console.log('event', event)
        return event
      })
    )
  }
}
