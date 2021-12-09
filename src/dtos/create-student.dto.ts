import {  IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  readonly grade: number;
}