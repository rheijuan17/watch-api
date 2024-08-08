import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { WatchModule } from './watch/watch.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ApiLogger } from './logger.service';

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
