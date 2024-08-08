import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { WatchService } from './watch.service';
import { ConfigService } from '@nestjs/config';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';

@Controller('watch')
export class WatchController {
    constructor(
        private watchService: WatchService,
        private configService: ConfigService
    ) {}

    @Get()
    async getAll(@Query('brand') brand?: string) {
        return await this.watchService.getAll(brand);
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return await this.watchService.get(id);
    }

    @Post()
    async create(@Body() createWatchDto: CreateWatchDto) {
        return await this.watchService.create(createWatchDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateWatchDto : UpdateWatchDto) {
        return await this.watchService.update(id, updateWatchDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.watchService.delete(id);
    }
}
