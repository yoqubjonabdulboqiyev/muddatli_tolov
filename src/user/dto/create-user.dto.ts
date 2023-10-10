import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
     @ApiProperty({
        example: 'John',
        description: 'name',
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

   @ApiProperty({
        example: 'uilms',
        description: 'last name',
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

     @ApiProperty({
        example: '+998940102003',
        description: 'phone number',
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('UZ')
    phone_number: string;

   @ApiProperty({
        example: 'yoqubjonabdulboqiyev@gmail.com',
        description: 'email address',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Uzbeki$t0n',
        description: 'password',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
    })
    password: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsString()
    @IsOptional()
    hashed_refresh_token: string;

    @IsString()
    @IsOptional()
    activation_link: string;

    @ApiProperty({
        example: 'default.jpeg',
        description: 'photo url',
    })
    @IsString()
    @IsOptional()
    photo: string;

    @ApiProperty({
        example: 'pasport data',
        description: 'pasport',
    })
    @IsString()
    @IsNotEmpty()
    pasport_data: string;
}
