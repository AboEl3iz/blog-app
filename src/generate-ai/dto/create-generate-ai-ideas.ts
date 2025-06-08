import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString } from "class-validator";

export class CreateGenerateAiIdeasDto {
    @ApiProperty({
        description: 'The topic of the post ideas',
        example: 'NestJS'
    })
    @IsNotEmpty()
    @IsString()
    topic: string;
    
    
}
