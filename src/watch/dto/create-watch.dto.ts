import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWatchDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsUUID()
  code: string;
}