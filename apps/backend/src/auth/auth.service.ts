import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.schema';

type SignInProps =
  | {
      email: string;
      password: string;
    }
  | User;

function isUser(props: SignInProps): props is User {
  return (props as User).id !== undefined;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(props: SignInProps): Promise<{ access_token: string }> {
    // if user passed we can skip db query
    let user: User | undefined;

    if (isUser(props)) {
      user = props;
    } else {
      user = await this.usersService.findOne(props.email);
    }

    if (!user || bcrypt.compareSync(user.email, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign(
        {
          username: user.username,
          sub: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '60d',
          algorithm: 'HS512',
        },
      ),
    };
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create({
      email,
      password,
    });

    return this.signIn(user);
  }
}
