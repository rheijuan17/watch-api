import { Module } from '@nestjs/common';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { ApiLogger } from 'src/logger.service';

@Module({
  imports: [ConfigModule],
  controllers: [WatchController],
  providers: [WatchService, PrismaService, ApiLogger]
})
export class WatchModule {}
