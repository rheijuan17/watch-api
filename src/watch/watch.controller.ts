import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { WatchService } from './watch.service';
import { Watch } from 'src/models/watch.model';
import { ConfigService } from '@nestjs/config';

@Controller('watch')
export class WatchController {
    constructor(
        private watchService: WatchService,
        private configService: ConfigService
    ) {}

    @Get()
    getAll(@Query('brand') brand?: string) {
        const brands = this.configService.get<string>('BRANDS').split(',');
        
        if (!(brand in brands)) {
            return false;
        }
        
        return this.watchService.getAll(brand);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.watchService.get(id);
    }

    @Post()
    create(@Body() watch: Watch) {
        return this.watchService.create(watch);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() watchUpdate: {}) {
        return { id, ...watchUpdate };
    }

    @Delete(':id')
    delete(@Param('id') id: string) {

    }
}
