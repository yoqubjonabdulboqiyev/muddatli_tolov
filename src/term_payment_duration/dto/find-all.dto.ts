import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class FindTermPaymentDurationDto {
    @ApiProperty({
        example: 5,
        description: 'duration',
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    duration: number;

    @ApiProperty({
        example: 6000000,
        description: 'total price',
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    total_price: number;

    @ApiProperty({
        example: 1,
        description: 'product id',
    })
    @IsNumber()
    @IsOptional()
    @Min(0)
    product_id: number;
}
