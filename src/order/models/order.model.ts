import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { PaymentHistory } from "src/payment_history/models/payment_history.model";
import { Product } from "src/product/models/product.model";
import { TermPaymentDuration } from "src/term_payment_duration/models/term_payment_duration.model";
import { User } from "src/user/models/user.model";

interface OrderAttr {
    user_id: number;
    product_id: number;
    duration_id: number;
    success: boolean;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderAttr> {
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
        example: true,
        description: 'Term paymented ',
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    success: Boolean;

    @ApiProperty({
        example: 1,
        description: 'unical user id',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    user_id: number;

    @ApiProperty({
        example: 1,
        description: 'unical product id',
    })
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    product_id: number;


    @ApiProperty({
        example: 1,
        description: 'product count',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    count: number;

    @ApiProperty({
        example: 1,
        description: 'unical duration id',
    })
    @ForeignKey(() => TermPaymentDuration)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    duration_id: number;

    @HasMany(() => PaymentHistory)
    history: PaymentHistory[];

    @BelongsTo(() => TermPaymentDuration)
    duration: TermPaymentDuration[];

    @BelongsTo(() => Product)
    product: Product[];

}



