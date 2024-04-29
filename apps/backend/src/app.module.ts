import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { AgenciesService } from './agencies/agencies.service';
import { AgenciesController } from './agencies/agencies.controller';
import { AgenciesModule } from './agencies/agencies.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    CarsModule,
    AgenciesModule,
    UsersModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
    }),
    DbModule,
  ],
  controllers: [AppController, AgenciesController],
  providers: [AppService, AgenciesService, UsersService],
})
export class AppModule {}
