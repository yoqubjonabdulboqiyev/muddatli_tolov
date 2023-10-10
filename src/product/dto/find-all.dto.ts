import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class FindProductDto {
    @ApiProperty({
        example: "name",
        description: 'Product name',
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        example: "Zor",
        description: 'Product description',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 1,
        description: 'unical category  id',
    })
    @IsString()
    @IsOptional()
    category_id?: string;


}
