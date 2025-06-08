import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayloadTokenDTO {
    @IsNotEmpty()
    @IsString()
    userId: string;
    @IsNotEmpty()
    @IsString()
    roles: string;
}