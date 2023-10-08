import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class FindAllDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    @IsOptional()
    phone_number?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email?: string;
}
