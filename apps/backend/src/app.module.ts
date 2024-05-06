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
import { RentalsModule } from './rentals/rentals.module';
import { envSchema } from './env.schema';

@Module({
  imports: [
    CarsModule,
    AgenciesModule,
    UsersModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      validate: (config) => {
        const res = envSchema.parse(config);
        console.info('config validation finished OK');
        return res;
      },
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      expandVariables: true,
    }),
    DbModule,
    RentalsModule,
  ],
  controllers: [AppController, AgenciesController],
  providers: [AppService, AgenciesService, UsersService],
})
export class AppModule {}
