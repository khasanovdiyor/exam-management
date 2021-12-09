import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly universityID: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}