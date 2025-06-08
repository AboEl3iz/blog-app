import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {


    @ApiProperty({ description: 'The content of the comment' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiPropertyOptional({ description: 'The parent comment ID for reply comments' })
    @IsString()
    @IsOptional()
    parentComment?: string;
    @ApiPropertyOptional({ description: 'The replies of the comment' })
    @IsOptional()
    replies?: CreateCommentDto[];
}
