import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GenerateTextRequestDto {
  @IsString()
  prompt!: string;

  @IsOptional()
  @IsString()
  systemInstruction?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  @Transform(({ value }) => (value === undefined ? value : Number(value)))
  temperature?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(8192)
  @Transform(({ value }) => (value === undefined ? value : Number(value)))
  maxOutputTokens?: number;
}


