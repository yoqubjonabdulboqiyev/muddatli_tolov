import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";
import { Product } from "src/product/models/product.model";
import { TermPaymentDuration } from "src/term_payment_duration/models/term_payment_duration.model";

interface UserAttr {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    is_active: boolean;
    hashed_refresh_token: string;
    activation_link: string;
    photo: string;
    pasport_data: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttr> {
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

    @Column({
        type: DataType.STRING,
    })
    @ApiProperty({
        example: 'default.jpeg',
        description: 'photo url',
    })
    photo: string

    @ApiProperty({
        example: 'pasport data',
        description: 'pasport',
    })
    @Column({
        type: DataType.STRING,
    })
    pasport_data: string;

    @BelongsToMany(() => Product, () => Order)
    // @BelongsTo(() => TermPaymentDuration)
    orders: Product[];

}
