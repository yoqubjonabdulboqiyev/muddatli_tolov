import { ApiProperty } from "@nestjs/swagger";
import {  IsOptional, IsString } from "class-validator";

export class FindCategoryDto {
    @ApiProperty({
        example: "Kiyimlaar",
        description: 'Category name',
    })
    @IsString()
    @IsOptional()
    name: string;
}
