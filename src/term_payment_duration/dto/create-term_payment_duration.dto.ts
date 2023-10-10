import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateTermPaymentDurationDto {

    @ApiProperty({
        example: 5,
        description: 'duration',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    duration: number;

    @ApiProperty({
        example: 6000000,
        description: 'total price',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    total_price: number;

    
    @ApiProperty({
        example: 1,
        description: 'product id',
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    product_id: number;
}
