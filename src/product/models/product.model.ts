import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/category/model/category.model";
import { Order } from "src/order/models/order.model";
import { Photo } from "src/product_photo/models/product_photo.model";
import { TermPaymentDuration } from "src/term_payment_duration/models/term_payment_duration.model";
import { User } from "src/user/models/user.model";

interface ProductAttr {
    name: string;
    description: string;
    buy_price: number;
    sell_price: number;
    count: number;
    category_id: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttr> {
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
        example: "Telefon",
        description: 'Product name',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;

    @ApiProperty({
        example: "best phone",
        description: 'product description',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @ApiProperty({
        example: 5000000,
        description: 'Product by price',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    buy_price: number;

    @ApiProperty({
        example: 6000000,
        description: 'Product sell price',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    sell_price: number;

    @ApiProperty({
        example: 100,
        description: 'product count',
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    count: number;

    @ApiProperty({
        example: 1,
        description: 'product category id',
    })
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => Photo)
    photoes: Photo[];

    @HasMany(() => TermPaymentDuration)
    durations: TermPaymentDuration[];

    @HasMany(()=>Order)
    order: Order[];
}   



