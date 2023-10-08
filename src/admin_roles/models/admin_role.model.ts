import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "src/admin/models/admin.model";
import { Role } from "src/role/models/role.model";

interface Admin_rolesAttr {
    admin_id: number;
    role_id: number;
}

@Table({ tableName: 'admin_roles' })
export class Admin_roles extends Model<Admin_roles, Admin_rolesAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(()=>Admin)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    admin_id: number;

    @ForeignKey(()=>Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    role_id: number;
}



