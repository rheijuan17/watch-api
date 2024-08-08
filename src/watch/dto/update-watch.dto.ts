import { IsString, IsOptional } from 'class-validator';

export class UpdateWatchDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly brand: string;
}