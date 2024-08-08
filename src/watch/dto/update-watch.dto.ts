import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWatchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Omega Speedmaster', description: 'The name of the watch' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Omega', description: 'The brand of the watch' })
  readonly brand: string;
}