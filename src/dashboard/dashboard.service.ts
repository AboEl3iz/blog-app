import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class DashboardService {
  constructor(@InjectModel('Comment') private readonly commentrepository: Model<Comment>,
  @InjectModel('Post') private readonly postrepository: Model<Post>) {}
 async dashboard() {
    const [totalPosts, totalComments , drafts , published , AIgenerated] = await Promise.all([
      this.postrepository.countDocuments(),
      this.commentrepository.countDocuments(),
      this.postrepository.countDocuments({ isDraft: true }),
      this.postrepository.countDocuments({ isDraft: false }),
      this.postrepository.countDocuments({ isAIgenerated: true }),
    ]);

    const totalviews = await this.postrepository.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);
    const totallikes = await this.postrepository.aggregate([
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
    ]);

    const totalViews = totalviews.length > 0 ? totalviews[0].totalViews : 0;
    const totalLikes = totallikes.length > 0 ? totallikes[0].totalLikes : 0;

    const topposts = await this.postrepository
      .find()
      .select('title tags author coverImage views likes')
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'name email profilePicture')
      .exec();
      
      const recentcomments = await this.commentrepository
    .find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('auther', 'name email profilePicture')
    .populate('post', 'title content coverImage')
    .exec();

    const tagsusage = await this.postrepository.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    return{
      statistics: {
        totalPosts,
        totalComments,
        totalViews,
        totalLikes,
        drafts,
        published,
        AIgenerated,
      },
      topposts,
      recentcomments,
      tagsusage
    }
  }
  

  
}
