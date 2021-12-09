import { IsNumber, IsString } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  readonly text: string;

  @IsNumber()
  readonly examId: number;
}
