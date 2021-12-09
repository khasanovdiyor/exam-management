import { IsNumber, IsString } from "class-validator";

export class CreateExamDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
