import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateUserDto {
   @IsString()
   email: string;
   @IsString()
   username: string;
   @IsString()
   password: string;
}

export class UpdateUserDto {
   @IsString()
   email: string;
   @IsString()
   username: string;
   @IsString()
   password: string;
}

export class addFavoriteDish {
   @IsNumber()
   userId: number;
   @IsNumber()
   dishId: number;
}