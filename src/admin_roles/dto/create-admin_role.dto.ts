import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAdminRoleDto {
    @ApiProperty({
        example: 1,
        description: 'unical admin id',
    })
    @IsNumber()
    @IsNotEmpty()
    admin_id:number;

    @ApiProperty({
        example: 1,
        description: 'unical role id',
    })
    @IsNumber()
    @IsNotEmpty()
    role_id:number;
}
