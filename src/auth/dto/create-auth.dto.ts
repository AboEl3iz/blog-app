import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({ description: 'The role of the user' })
    @IsString()
    @IsOptional()
    role?: string;

    @ApiPropertyOptional({ description: 'The roletoken of the user' })
    @IsString()
    @IsOptional()
    roletoken?: string;
}

