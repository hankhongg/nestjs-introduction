import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'EMPLOYEE'],{
        message: 'Role must be either INTERN or EMPLOYEE'
    })
    role: 'INTERN' | 'EMPLOYEE';
}
