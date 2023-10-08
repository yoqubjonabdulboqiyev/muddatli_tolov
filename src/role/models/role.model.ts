import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "src/admin/models/admin.model";
import { Admin_roles } from "src/admin_roles/models/admin_role.model";

interface RoleAttr {
    name: string;
    description: string;
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleAttr> {
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

    @ForeignKey(() => Role)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @BelongsToMany(() => Admin, () => Admin_roles)
    admin: Admin[];
}


