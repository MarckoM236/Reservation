import { IsBIC, IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty({
    example: 'John Doe',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
    example: 'john.doe@example.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
    example: 'newSecurePassword123',
    })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({
    example: true,
    })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

}