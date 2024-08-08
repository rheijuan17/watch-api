import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

import { PrismaService } from 'src/util/prisma';
import { ApiLogger } from 'src/util/logger/logger';


@Module({
  imports: [ConfigModule],
  controllers: [WatchController],
  providers: [WatchService, PrismaService, ApiLogger]
})
export class WatchModule {}
