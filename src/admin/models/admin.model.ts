import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Admin_roles } from "src/admin_roles/models/admin_role.model";
import { Role } from "src/role/models/role.model";

interface AdminAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    super_admin: boolean;
    is_active: boolean;
    hashed_refresh_token: string;
    activation_link: string;
    photo: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminAttr> {
    @ApiProperty({
        example: 1,
        description: "unical id",
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @ApiProperty({
        example: 'John',
        description: 'name',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    first_name: string;

    @ApiProperty({
        example: 'uilms',
        description: 'last name',
    })
    @Column({
        type: DataType.STRING,
    })
    last_name: string;

    @ApiProperty({
        example: '+998940102003',
        description: 'phone number',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    phone_number: string;

    @ApiProperty({
        example: 'yoqubjonabdulboqiyev@gmail.com',
        description: 'email address',
    })
    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string;
    @ApiProperty({
        example: 'Uzbeki$t0n',
        description: 'password',
    })
    @Column({
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    super_admin: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    activation_link: string

    @ApiProperty({
        example: 'default.jpeg',
        description: 'photo url',
    })
    @Column({
        type: DataType.STRING,
    })
    photo: string

    @BelongsToMany(() => Role, () => Admin_roles)
    roles: Role[];
}
