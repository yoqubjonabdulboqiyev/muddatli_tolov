import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()   
    @IsPhoneNumber('UZ')
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
    })
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    super_admin: boolean;

    // @IsBoolean()
    // // @IsNotEmpty()
    // is_active: boolean;

    // @IsString()
    // // @IsNotEmpty()
    // hashed_refresh_token: string;

    // @IsString()
    // // @IsNotEmpty()
    // activation_link: string;

    @IsString()
    @IsNotEmpty()
    photo: string;
}
