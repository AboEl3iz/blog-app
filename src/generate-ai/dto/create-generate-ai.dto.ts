import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenerateAiReplyDto {
    @ApiProperty({ description: 'The content of the AI reply' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'The name of the author' })
    @IsNotEmpty()
    @IsString()
    authername: string;

    @ApiProperty({ description: 'The title of the post' })
    @IsNotEmpty()
    @IsString()
    posttitle: string;
}

