import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class LoginAuthDto {

    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({
        description: 'The password of the user',
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
