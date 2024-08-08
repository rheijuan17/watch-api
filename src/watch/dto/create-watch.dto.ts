import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Omega Speedmaster', description: 'The name of the watch' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Omega', description: 'The brand of the watch' })
  readonly brand: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'a526463c-6bbf-43fa-a93f-a00b859d95ee', description: 'The reference number of the watch' })
  code: string;
}