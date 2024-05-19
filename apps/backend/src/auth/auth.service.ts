import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.schema';
import { PG_CONNECTION } from '../db/db.module';
import { Pool } from 'pg';
import { transaction } from '../db/utils/transaction';

export type SignInProps =
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
    @Inject(PG_CONNECTION) private conn: Pool,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(
    props: SignInProps,
  ): Promise<{ access_token: string; refresh_token: string }> {
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
      access_token: this.getToken('60m', user, this.jwtService),
      refresh_token: this.getToken('60d', user, this.jwtService),
    };
  }

  private getToken(expiresIn: string, user: User, jwtService: JwtService) {
    return jwtService.sign(
      {
        username: user.username,
        sub: user.id,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn,
        algorithm: 'HS512',
      },
    );
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ token: string; watch_uuid: string }> {
    return transaction(this.conn, async (client) => {
      const user = await this.usersService.create({
        email,
        password,
      });

      const token = bcrypt.hashSync(user.email, 10);

      const res = await client.query<{ token: string; watch_uuid: string }>({
        text: 'INSERT INTO email_verifications (created_by, token) VALUES ($1, $2) RETURNING token, watch_uuid',
        values: [user.id, token],
      });

      // TODO: send email with verification token
      return res.rows[0];
    });
  }

  async refreshtoken(refresh_token: string): Promise<{ access_token: string }> {
    try {
      const { sub: userId } = this.jwtService.verify<{ sub: string }>(
        refresh_token,
        { secret: process.env.JWT_SECRET },
      );

      const user = await this.usersService.findOneById(parseInt(userId));

      const token = this.getToken('5m', user, this.jwtService);

      return {
        access_token: token,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
