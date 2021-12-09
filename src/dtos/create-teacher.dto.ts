import { IsEnum, IsString } from "class-validator";
import { Grade } from "../common/enums/grade.enum";

export class CreateTeacherDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEnum(Grade)
  readonly grade: number;
}
