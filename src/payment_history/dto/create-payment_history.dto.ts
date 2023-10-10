import { ApiProperty } from "@nestjs/swagger";
import { IsDataURI, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentHistoryDto {

    @ApiProperty({
        example: 1,
        description: 'unical user id',
    })
    @IsNumber()
    @IsNotEmpty()
    order_id: number;

    @ApiProperty({
        example: 100000,
        description: 'payment amount',
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        example: "2023-10-10T10:36:15.261Z",
        description: 'payment date',
    })
    @IsString()
    @IsNotEmpty()
    date: Date;

}
