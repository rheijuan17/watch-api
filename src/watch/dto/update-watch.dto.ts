import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWatchDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apple Watch Series 9', description: 'The name of the watch' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apple', description: 'The brand of the watch' })
  readonly brand: string;
}