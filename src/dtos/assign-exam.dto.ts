import { IsDate, IsNumber } from "class-validator";

export class AssignExamDto {
  @IsDate()
  startDate: Date;

  @IsNumber()
  duration: number;
}
