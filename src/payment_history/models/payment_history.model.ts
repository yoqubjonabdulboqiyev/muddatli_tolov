import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";
import { Product } from "src/product/models/product.model";
import { TermPaymentDuration } from "src/term_payment_duration/models/term_payment_duration.model";
import { User } from "src/user/models/user.model";

interface PaymentHistoryAttr {
    order_id: number;
    data: Date;
    amount: number;
}

@Table({ tableName: 'payment_history' })
export class PaymentHistory extends Model<PaymentHistory, PaymentHistoryAttr> {
    @ApiProperty({
        example: 1,
        description: 'unical  id',
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({
        example: 1,
        description: 'unical order id',
    })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;

    @ApiProperty({
        example: "2023-10-10T10:36:15.261Z",
        description: 'payment date',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    date: Date;

    @ApiProperty({
        example: 100000,
        description: 'payment  amount',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    amount: number;
}



