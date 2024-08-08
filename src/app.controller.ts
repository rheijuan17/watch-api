import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ruok')
@Controller('ruok')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Healthcheck' })
  @ApiResponse({ status: 200 })
  ruok(): string {
    return this.appService.ruok();
  }
}
