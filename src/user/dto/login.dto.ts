import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsStrongPassword, IsPhoneNumber, IsOptional } from 'class-validator';
export class LoginDto {
    @ApiProperty({
        example: '+998940102003',
        description: 'phone number',
    })
    @IsString()
    @IsPhoneNumber('UZ')
    @IsOptional()
    phone_number?: string;

    @ApiProperty({
        example: 'Uzbeki$t0n',
        description: 'password',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
