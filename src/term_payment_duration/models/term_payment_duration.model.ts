import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";
import { Product } from "src/product/models/product.model";
import { User } from "src/user/models/user.model";

interface TermPaymentDurationAttr {
    name: string;
    product_id: number;
}

@Table({ tableName: 'durations' })
export class TermPaymentDuration extends Model<TermPaymentDuration, TermPaymentDurationAttr> {
    @ApiProperty({
        example: 1,
        description: 'unical id',
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({
        example: 5,
        description: 'duration',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    duration: number;

    @ApiProperty({
        example: 6000000,
        description: 'total price',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    total_price: number;

    @ApiProperty({
        example: 1,
        description: 'product id',
    })
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;

    @HasMany(() => Order)
    order: Order[];
}



