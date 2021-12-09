import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  grade?: number;
}
