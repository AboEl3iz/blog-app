import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayloadTokenDTO {
    @ApiProperty({ description: 'The user ID' })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({ description: 'The roles of the user' })
    @IsNotEmpty()
    @IsString()
    roles: string;
}
