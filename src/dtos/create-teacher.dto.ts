import { IsString } from "class-validator";

export class CreateTeacherDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
