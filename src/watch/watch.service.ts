import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

import { Watch } from 'src/models/watch.model';

import { omit } from '../util/utils';

import { ApiLogger } from 'src/util/logger/logger';
import { PrismaService } from 'src/util/prisma';

@Injectable()
export class WatchService {

    constructor(
        private prisma: PrismaService,
        private logger: ApiLogger,
        private config: ConfigService,
    ) {}

    async getAll(paginationDto?: PaginationDto, brand?: string) {
        this.logger.log(`Retreving all watches`);
        let watchList: Watch[];
        let total = 0;
        
        const { page = 1, limit = this.config.get<number>('LIMIT') } = paginationDto;
        const skip = (page - 1) * limit;

        if (brand) {
            watchList = await this.prisma.watches.findMany({
                where: { brand },
                skip,
                take: limit,
            });
        }

        watchList = await this.prisma.watches.findMany();

        let _watchList: Partial<Watch>[] = [];

        if (watchList.length) {
            total = watchList.length;    
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
        return {
            data: watchList,
            total,
            page, 
            lastPage: Math.ceil(total / limit),
        };
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
