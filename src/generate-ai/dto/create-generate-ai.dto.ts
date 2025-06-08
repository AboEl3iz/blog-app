import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenerateAiReplyDto {
     @IsNotEmpty()
    @IsString()
    content :string
    @IsNotEmpty()
    @IsString()
     authername: string
    @IsNotEmpty()   
    @IsString() 
      posttitle: string;
}
