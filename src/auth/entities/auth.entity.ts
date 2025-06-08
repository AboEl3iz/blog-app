import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Auth {
    @Prop({required: true})
    name: string;
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({type: String, enum: ['member', 'admin'], default: 'member'})
    role: string;
    @Prop({type: Date, default: Date.now})
    createdAt: Date;
    @Prop({type: Date, default: Date.now})
    updatedAt: Date;
    @Prop({type: String, default: null})
    bio: string;
    @Prop({type: String, default: null})
    profilePicture: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);