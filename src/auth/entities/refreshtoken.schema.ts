import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class RefreshToken {
    
    @Prop()
    userId: string;
    @Prop()
    refreshtoken: string;
    @Prop()
    expirationDate: Date;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);