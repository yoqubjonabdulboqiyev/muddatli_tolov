import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "src/admin/models/admin.model";
import { Product } from "src/product/models/product.model";
import { Role } from "src/role/models/role.model";

interface Admin_rolesAttr {
    admin_id: number;
    role_id: number;
}

@Table({ tableName: 'admin_roles' })
export class Admin_roles extends Model<Admin_roles, Admin_rolesAttr> {
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
        example: 1,
        description: 'unical admin id',
    })
    @ForeignKey(()=>Admin)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    admin_id: number;

    @ApiProperty({
        example: 1,
        description: 'unical  role id',
    })
    @ForeignKey(()=>Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    role_id: number;

    @BelongsTo(() => Role)
    roles: Role;
}



