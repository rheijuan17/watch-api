import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WatchModule } from './watch/watch.module';

import { PrismaService } from './util/prisma';
import { ApiLogger } from './util/logger/logger';

@Module({
  imports: [ConfigModule.forRoot(), WatchModule],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiLogger,
    },
    ],
})
export class AppModule {}
