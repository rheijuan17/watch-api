import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

import { Watch } from 'src/models/watch.model';

import { omit } from '../util/utils';

const { v4: uuid } = require('uuid');

@Injectable()
export class WatchService {

    constructor(private prisma: PrismaService) {}

    async getAll(brand?: string) {
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
            // TODO: add logger
            console.log('No watches to return');
        }

        return watchList;
    }

    get(id: string) {
        const code = id;

        return this.prisma.watches.findUnique({
            where: { code }
        });
    }

    async create(createWatchDto: CreateWatchDto) {
        createWatchDto.code = uuid();

        // TODO: remove replace id with code
        const watch = await this.prisma.watches.create({
            data: createWatchDto
        });
        
        return {
            id: watch.code,
            ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
        };
    }

    async update(id: string, updateWatchDto: UpdateWatchDto) {
        const code = id;

        const watch = await this.prisma.watches.update({
            where: { code },
            data: updateWatchDto 
        });
        
        return {
            id: watch.code,
            ...omit(watch, 'id', 'code', 'createdAt', 'updatedAt')
        };
    }

    async delete(id: string) {
        const code = id;
        
        await this.prisma.watches.delete({
            where: { code }
        });
        
        return;
    }
}
