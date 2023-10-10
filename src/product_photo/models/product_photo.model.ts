import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/product/models/product.model";

interface PhotoAttr {
    name: string;
    product_id: number;
}

@Table({ tableName: 'product_photo' })
export class Photo extends Model<Photo, PhotoAttr> {
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
        example: "defaul.jpeg",
        description: 'photo url',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    name: string;

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

}



