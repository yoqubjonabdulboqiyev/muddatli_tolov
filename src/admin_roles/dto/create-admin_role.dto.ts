import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAdminRoleDto {
    @IsNumber()
    @IsNotEmpty()
    admin_id:number;

    @IsNumber()
    @IsNotEmpty()
    role_id:number;
}
