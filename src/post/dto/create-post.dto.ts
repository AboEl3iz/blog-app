import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    content: string;


    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];


    @IsBoolean()
    @IsNotEmpty()
    isDraft: boolean;


    @IsBoolean()
    @IsNotEmpty()
    generatedByAI: boolean;
}
