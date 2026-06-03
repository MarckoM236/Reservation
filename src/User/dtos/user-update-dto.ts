import { IsBIC, IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

}