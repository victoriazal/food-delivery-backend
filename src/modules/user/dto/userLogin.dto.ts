import { IsString } from "@nestjs/class-validator";

export class UserLoginDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}