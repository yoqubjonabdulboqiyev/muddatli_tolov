import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        example: "Telefon",
        description: 'Product name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "best phone",
        description: 'product description',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 5000000,
        description: 'Product by price',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    buy_price: number;

    @ApiProperty({
        example: 6000000,
        description: 'Product sell price',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    sell_price: number;

    @ApiProperty({
        example: 100,
        description: 'product count',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    count: number;

    @ApiProperty({
        example: 1,
        description: 'product category id',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    category_id: number;

}
