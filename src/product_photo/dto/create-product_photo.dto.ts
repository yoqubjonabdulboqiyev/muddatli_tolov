import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductPhotoDto {
    @ApiProperty({
        example: "defaul.jpeg",
        description: 'photo url',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 1,
        description: 'product id',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    product_id: number;

}
