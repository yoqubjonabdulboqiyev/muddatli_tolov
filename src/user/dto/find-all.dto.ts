import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class FindUserDto {
    @ApiProperty({
        example: 'John',
        description: 'name',
    })
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiProperty({
        example: 'uilms',
        description: 'last name',
    })
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiProperty({
        example: '+998940102003',
        description: 'phone number',
    })
    @IsString()
    @IsPhoneNumber('UZ')
    @IsOptional()
    phone_number?: string;

    @ApiProperty({
        example: 'yoqubjonabdulboqiyev@gmail.com',
        description: 'email address',
    })
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;
}
