import { IsString } from "class-validator";

export class CreateSubjectDto {
  @IsString()
  title: string;

  @IsString()
  code: string;
}
