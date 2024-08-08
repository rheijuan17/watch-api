import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

import { Watch } from 'src/models/watch.model';

import { ApiLogger } from 'src/util/logger';
import { omit } from '../util/utils';

@Injectable()
export class WatchService {

    constructor(
        private prisma: PrismaService,
        private logger: ApiLogger
    ) {}

    async getAll(brand?: string) {
        this.logger.log(`Retreving all watches`);
        let watchList: Watch[];

        if (brand) {
            watchList = await this.prisma.watches.findMany({
                where: { brand }
            });
        }

        watchList = await this.prisma.watches.findMany();

        let _watchList: Partial<Watch>[] = [];

        if (watchList.length) {
            watchList.forEach((watch) => {
                _watchList.push({
                    id: watch.code,
                    ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
                })
            });

            return _watchList;
        } else {
            this.logger.log(`No watches to return`);
        }

        this.logger.log(`Done retreving all watches`);
        return watchList;
    }

    get(id: string) {
        this.logger.log(`Retreving watch by code`);
        const code = id;

        this.logger.log(`Done retreving a watch`);
        return this.prisma.watches.findUnique({
            where: { code }
        });
    }

    async create(createWatchDto: CreateWatchDto) {
        this.logger.log(`Creating a watch`);
        const watch = await this.prisma.watches.create({
            data: createWatchDto
        });
        
        this.logger.log(`Done creating a watch`);
        return {
            id: watch.code,
            ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
        };
    }

    async update(id: string, updateWatchDto: UpdateWatchDto) {
        this.logger.log(`Updating a watch`);
        const code = id;

        const watch = await this.prisma.watches.update({
            where: { code },
            data: updateWatchDto 
        });
        
        this.logger.log(`Done updating a watch`);
        return {
            id: watch.code,
            ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
        };
    }

    async delete(id: string) {
        this.logger.log(`Updating a watch`);
        const code = id;
        
        this.logger.log(`Done deleting a watch`);
        await this.prisma.watches.delete({
            where: { code }
        });
        
        return;
    }
}
