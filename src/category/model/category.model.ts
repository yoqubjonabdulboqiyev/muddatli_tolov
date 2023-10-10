import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/product/models/product.model";

interface CategoryAttr {
    name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
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
        example: "Kiyimlaar",
        description: 'Category name',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    name: string;

    @HasMany(() => Product)
    product: Product[];

}



