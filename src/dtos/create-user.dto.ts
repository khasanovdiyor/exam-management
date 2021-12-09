import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../common/enums/user-role.enum";

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}