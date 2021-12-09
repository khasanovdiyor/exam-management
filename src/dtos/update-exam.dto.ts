import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateExamDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsNumber()
  duration?: number;
}
