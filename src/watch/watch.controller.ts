import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { Watch } from 'src/models/watch.model';
import { WatchService } from './watch.service';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';

@ApiTags('watches')
@Controller('watch')
export class WatchController {
    constructor(
        private watchService: WatchService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all watches' })
    @ApiQuery({
        name: 'brand',
        description: 'Filter products by brand',
        example: 'Nike',
        required: false,
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Watch List', 
        schema: {
            example: [
            {
                id: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
                name: 'Omega Speedmaster',
                brand: 'Omega'
            },
            {
                id: 'fdae7b96-b327-44ab-ac9c-cb341898ade3',
                name: 'SNR025',
                brand: 'Seiko'
            }
            ],
        }
    })
    async getAll(@Query() paginationDto?: PaginationDto, @Query('brand') brand?: string) {
            return await this.watchService.getAll(paginationDto, brand);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get watch by id' })
    @ApiQuery({
        name: 'id',
        description: 'Unique reference number of watch',
        example: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
        required: true,
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Watch', 
        schema: {
            example: {
                id: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
                name: 'Omega Speedmaster',
                brand: 'Omega'
            },
        }
    })
    async get(@Param('id') id: string) {
        return await this.watchService.get(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a watch' })
    @ApiResponse({ 
        status: 200, 
        description: 'Created watch', 
        schema: {
            example: {
                id: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
                name: 'Omega Speedmaster',
                brand: 'Omega'
            },
        },
    })
    async create(@Body() createWatchDto: CreateWatchDto) {
        return await this.watchService.create(createWatchDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update watch with given id' })
    @ApiQuery({
        name: 'id',
        description: 'Unique reference number of watch',
        example: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
        required: true,
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Updated Watch', 
        schema: {
            example: {
                id: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
                name: 'Apple Watch Series 9',
                brand: 'Apple'
            },
        }, 
    })
    async update(@Param('id') id: string, @Body() updateWatchDto : UpdateWatchDto) {
        return await this.watchService.update(id, updateWatchDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete watch with given id' })
    @ApiQuery({
        name: 'id',
        description: 'Unique reference number of watch',
        example: 'a526463c-6bbf-43fa-a93f-a00b859d95ee',
        required: true,
    })
    @ApiResponse({ status: 204 })
    async delete(@Param('id') id: string) {
        return await this.watchService.delete(id);
    }
}
