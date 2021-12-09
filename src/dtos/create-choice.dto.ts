import { IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateChoiceDto {
  @ValidateNested()
  choice: CreateChoiceShape[];
}

class CreateChoiceShape {
  @IsString()
  readonly text: string;

  @IsNumber()
  readonly points: number;
}
