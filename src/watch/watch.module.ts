import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

import { PrismaService } from 'src/prisma.service';
import { ApiLogger } from 'src/util/logger';

@Module({
  imports: [ConfigModule],
  controllers: [WatchController],
  providers: [WatchService, PrismaService, ApiLogger]
})
export class WatchModule {}
