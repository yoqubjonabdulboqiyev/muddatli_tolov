import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Kiyimlaar",
        description: 'Category name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
