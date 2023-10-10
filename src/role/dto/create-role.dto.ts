import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        example: "Admin",
        description: 'role name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "super admin",
        description: 'super admin role',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}
