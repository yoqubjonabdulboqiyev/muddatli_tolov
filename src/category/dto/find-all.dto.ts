import {  IsOptional, IsString } from "class-validator";

export class FindCategoryDto {
    @IsString()
    @IsOptional()
    name: string;
}
