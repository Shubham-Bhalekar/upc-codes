// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UpcController } from './upc/upc.controller';
import { UpcService } from './upc/upc.service';
import { UpcCode, UpcCodeSchema } from './schemas/upcCodes.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: UpcCode.name, schema: UpcCodeSchema }]),
    AuthModule,
    UsersModule,
    PassportModule
  ],
  controllers: [UpcController, AuthController, UsersController],
  providers: [UpcService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
