import { Contains, IsString } from "class-validator";

export class LoginDto {
  @Contains("U" + new Date().getFullYear().toString().substr(2, 2))
  @IsString()
  universityID: string;

  @IsString()
  password: string;
}
