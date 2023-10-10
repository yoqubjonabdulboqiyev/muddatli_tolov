import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: 1,
        description: 'unical user id',
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        example: 1,
        description: 'unical product id',
    })
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({
        example: 1,
        description: 'unical duration id',
    })
    @IsNumber()
    @IsNotEmpty()
    duration_id: number;

    @ApiProperty({
        example: 10,
        description: 'product count',
    })
    @IsNumber()
    @IsNotEmpty()
    count: number;

}
