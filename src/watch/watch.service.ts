import { Injectable, NotFoundException } from '@nestjs/common';
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
        
        const { page = this.config.get<number>('PAGE'), limit = this.config.get<number>('LIMIT') } = paginationDto;

        const _page = Number(page);
        const _limit = Number(limit);

        const skip = (_page - 1) * _limit;

        if (brand) {
            watchList = await this.prisma.watches.findMany({
                where: { brand },
                skip,
                take: _limit,
            });

            total = await this.prisma.watches.count({
                where: { brand },
            });
        } else {
            watchList = await this.prisma.watches.findMany({
                skip,
                take: _limit,
            });

            total = await this.prisma.watches.count();
        }

        let _watchList: Partial<Watch>[] = [];

        if (watchList.length) {  
            watchList.forEach((watch) => {
                _watchList.push({
                    id: watch.code,
                    ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
                })
            });
        } else {
            this.logger.log(`No watches to return`);
            throw new NotFoundException(`No watches to return`);
        }

        this.logger.log(`Done retreving all watches`);
        return {
            data: _watchList,
            total,
            page: _page, 
            lastPage: Math.ceil(total / _limit),
        };
    }

    async get(id: string) {
        this.logger.log(`Retreving watch by code`);
        const code = id;

        const watch = await this.prisma.watches.findUnique({
            where: { code }
        });
        
        if (!watch) {
            throw new NotFoundException(`No watch found with reference no ${code}`); 
        }

        this.logger.log(`Done retreving a watch`);
        return watch;
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

        const watch = await this.prisma.watches.findUnique({
            where: { code }
        });

        if (!watch) {
            throw new NotFoundException(`No watch found with reference no ${code}`); 
        }

        const _watch = await this.prisma.watches.update({
            where: { code },
            data: updateWatchDto 
        });
        
        this.logger.log(`Done updating a watch`);
        return {
            id: _watch.code,
            ...omit(_watch, 'id', 'code', 'createdAt', 'updatedAt')
        };
    }

    async delete(id: string) {
        this.logger.log(`Updating a watch`);
        const code = id;

        const watch = await this.prisma.watches.findUnique({
            where: { code }
        });

        if (!watch) {
            throw new NotFoundException(`No watch found with reference no ${code}`); 
        }
        
        this.logger.log(`Done deleting a watch`);
        await this.prisma.watches.delete({
            where: { code }
        });
        
        return;
    }
}
