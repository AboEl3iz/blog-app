import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {


    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    parentComment?: string;// Optional field for reply comments
    @IsOptional()
    replies?: CreateCommentDto[];
}
