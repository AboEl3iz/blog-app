import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDTO {
    @ApiProperty({ description: 'The refresh token string' })
    @IsString()
    @IsNotEmpty()
    refreshtoken: string;
}
