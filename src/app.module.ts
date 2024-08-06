import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpcController } from './upc/upc.controller';
import { UpcService } from './upc/upc.service';
import { UpcCode, UpcCodeSchema } from './schemas/upcCodesSchema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the module global, no need to import in other modules
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017/upc_test_blank'),
    MongooseModule.forFeature([{ name: UpcCode.name, schema: UpcCodeSchema }]),
  ],
  controllers: [AppController, UpcController],
  providers: [AppService, UpcService],
})
export class AppModule {}
