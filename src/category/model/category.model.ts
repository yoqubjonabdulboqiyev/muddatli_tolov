import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface CategoryAttr {
    name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    name: string;
}



