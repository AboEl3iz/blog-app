import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema()
export class Comment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    post:mongoose.Schema.Types.ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true })
    auther:mongoose.Schema.Types.ObjectId;
    @Prop({ required: true })
    content:string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null })
    parentComment?:mongoose.Schema.Types.ObjectId;
    @Prop({ type: Date, default: Date.now })
    createdAt:Date;
    @Prop({ type: Date, default: Date.now })
    updatedAt:Date
    @Prop({ type: [Object], default: [] }) // Optional, or just define in TypeScript
    replies?: Comment[];

}
export const CommentSchema = SchemaFactory.createForClass(Comment);