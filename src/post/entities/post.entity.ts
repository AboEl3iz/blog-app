import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true, unique: true })
    slug: string;
    @Prop({ required: true })
    content: string;
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
    @Prop({ type: String, default: null })
    coverImage: string;
    @Prop({ type: [String], default: [] })
    tags: string[];
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true })
    author: mongoose.Schema.Types.ObjectId;
    @Prop({ type: Boolean, default: false })
    isDraft: boolean;
    @Prop({ type: Number, default: 0 })
    views: number;
    @Prop({ type: Number, default: 0 })
    likes: number;
    @Prop({ type: Boolean, default: false })
    generatedByAI: boolean;
}
export const PostSchema = SchemaFactory.createForClass(Post);