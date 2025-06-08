import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenerateAiIdeasDto {
    @IsNotEmpty()
    @IsString()
    topic: string;
    
    
}