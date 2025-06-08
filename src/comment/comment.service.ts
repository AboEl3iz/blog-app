import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';
export interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
}
@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private readonly commentrepository: Model<Comment>,
@InjectModel('Post') private readonly postrepository: Model<Post>
) {}
 async addcomment(createCommentDto: CreateCommentDto , authorId: string , postId: string) {
  const post = await this.postrepository.findById(postId)  
  if ( !postId) {
      throw new BadRequestException(' Post ID are required');
    }
    ;
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const comment =await this.commentrepository.create({
      ...createCommentDto,
      auther: authorId,
      post: postId,
    });

    return comment.populate('auther', 'name email profilePicture');
  }

 async getcommentByPostID(id: string) {
    const comments =await this.commentrepository.find({ post: id }).populate('auther', 'name email profilePicture').populate('post', 'title content').sort({ createdAt: 1 });
    return comments;
  }

async getAllComments() {
  const comments = await this.commentrepository
    .find()
    .populate('auther', 'name email profilePicture')
    .populate('post', 'title content')
    .sort({ createdAt: 1 });

  const plainComments = comments.map(c => c.toObject());
  return this.buildCommentTree(plainComments);
}




 async deletecomment(id: string) {
    const comment =await this.commentrepository.findById(id);
    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    await this.commentrepository.deleteOne({ _id: id });
    await this.commentrepository.deleteMany(
      { parentComment: id },
      
    );
    return { message: 'Comment deleted successfully' };
  }

   buildCommentTree(flatComments: Comment[]): CommentWithReplies[] {
  const commentMap: Record<string, CommentWithReplies> = {};
  const rootComments: CommentWithReplies[] = [];

  // Step 1: Map all comments by ID and add `replies` array
  flatComments.forEach((comment) => {
    const id = (comment as any)._id.toString();
    commentMap[id] = {
      ...(comment as any),
      replies: [],
    };
  });

  // Step 2: Organize into tree
  Object.values(commentMap).forEach((comment) => {
    const parentId = comment.parentComment?.toString();
    if (parentId && commentMap[parentId]) {
      commentMap[parentId].replies.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
}
}
