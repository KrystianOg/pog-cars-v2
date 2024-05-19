import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { AgenciesModule } from './agencies/agencies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { DbModule } from './db/db.module';
import { RentalsModule } from './rentals/rentals.module';
import { envSchema } from './env.schema';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    CarsModule,
    AgenciesModule,
    UsersModule,
    AuthModule,
    RolesModule,
    EventEmitterModule.forRoot(),
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
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
