import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    title?: string;
    @IsOptional()
    content?: string;
    @IsOptional()
    coverImage?: string;
    @IsOptional()
    tags?: string[];
    @IsOptional()
    isDraft?: boolean;
    @IsOptional()
    generatedByAI?: boolean;
}
