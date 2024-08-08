import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { WatchService } from './watch.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Watch } from 'src/models/watch.model';


@ApiTags('watch')
@Controller('watch')
export class WatchController {
    constructor(
        private watchService: WatchService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all watches' })
    @ApiResponse({ status: 200, description: 'Watch List', type: [Watch] })
    async getAll(@Query('brand') brand?: string) {
        return await this.watchService.getAll(brand);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get watch by id' })
    @ApiResponse({ status: 200, description: 'Watch', type: Watch })
    async get(@Param('id') id: string) {
        return await this.watchService.get(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a watche' })
    @ApiResponse({ status: 200, description: 'Created watch', type: Watch })
    async create(@Body() createWatchDto: CreateWatchDto) {
        return await this.watchService.create(createWatchDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update watch with given id' })
    @ApiResponse({ status: 200, description: 'Updated Watch', type: Watch })
    async update(@Param('id') id: string, @Body() updateWatchDto : UpdateWatchDto) {
        return await this.watchService.update(id, updateWatchDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete watch with given id' })
    @ApiResponse({ status: 204 })
    async delete(@Param('id') id: string) {
        return await this.watchService.delete(id);
    }
}
