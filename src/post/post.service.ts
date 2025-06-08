import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';

import { Role } from 'src/decorator/enum/role.enum';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postrepository: Model<Post>,
@InjectModel('Auth') private readonly authrepository: Model<Auth>
) {}
  CreatePost(createPostDto: CreatePostDto , authorId: string) {
    const slug = createPostDto.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")  // Remove punctuation/special characters
    .replace(/\s+/g, "-")         // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); 
    const newPost = new this.postrepository({
      ...createPostDto,
      slug,
      author: authorId,
    });
    newPost.save();
    return {
      message: 'Post created successfully',
      post: newPost,
    };
  }

async  getAllPost(status: string , page: number ) {
    const query: any = {};
    if (status && status !== 'all') {
      query.isDraft = status === 'draft' ? true : false;
    }
    page = page || 1; // Default to page 1 if not provided
    const limit = 10; // Number of posts per page
    const skip = (page - 1) * limit; // Calculate the number of posts to skip
    const posts =await this.postrepository.find(query)
    .populate('author', 'name bio profilePicture email') // Populate author details
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .exec();

    const [totalcount , allcount , publishedcount , draftcount] = await Promise.all([
      this.postrepository.countDocuments(query),
      this.postrepository.countDocuments(),
      this.postrepository.countDocuments({ isDraft: false }),
      this.postrepository.countDocuments({ isDraft: true }),
    ]);

    return {
      posts,
      totalCount: totalcount,
      currentPage: page,
      totalPages: Math.ceil(totalcount / limit),
      count:{
        all: allcount,
        published: publishedcount,
        draft: draftcount
      }
    };
  }

  async incrementViews(id: string) {
    const post = await this.postrepository.findOne({ _id: id });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    post.views += 1;
    await post.save();
    return post;
  }

  async getPostByslug(slug: string) {
    const post = await this.postrepository.findOne({ slug });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async getPostByTag(tag: string) {
    const posts = await this.postrepository.find({ tags: tag });
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  async getPostBySearch(searchTerm: string) {
    const posts = await this.postrepository.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  } 

  async gettopPosts() {
    const posts = await this.postrepository.find().sort({ views: -1 }).limit(5);
    if (!posts) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  async incrementLikes(id: string) {
    const post = await this.postrepository.findOne({ _id: id });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    post.likes += 1;
    await post.save();
    return post;
  }

async  updatePost(id: string, updatePostDto: UpdatePostDto , authorId: string) {
    const userloggedin = await this.authrepository.findOne({ _id: authorId });
    const getpost = await this.postrepository.findOne({ _id: id });
    if (!getpost) {
      throw new BadRequestException('Post not found');
    }

    if (userloggedin!.role !== Role.Admin && getpost!.author.toString() !== authorId) {
      throw new UnauthorizedException('You are not authorized to update this post');
    }
   
    
    
    const newpost =  this.postrepository.updateOne({ _id: id }, { $set: updatePostDto },{ new: true });
    return newpost;
  }

 async deletePost(id: string, authorId: string) {
    const userloggedin = await this.authrepository.findOne({ _id: authorId });
    const getpost = await this.postrepository.findOne({ _id: id });
    if (!getpost) {
      throw new BadRequestException('Post not found');
    }
    if (userloggedin!.role !== Role.Admin && getpost!.author.toString() !== authorId) {
      throw new UnauthorizedException('You are not authorized to delete this post');
    }
    await  this.postrepository.deleteOne({ _id: id });
    return {
      message: 'Post deleted successfully'
    };
  }
}
