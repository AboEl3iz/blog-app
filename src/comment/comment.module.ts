import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  exports: [MongooseModule], // Export CommentService to be used in other modules
  imports: [
    PostModule, // Import PostModule to use Post entity
    // Import MongooseModule and register the Comment schema
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
    ]),JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
            global: true, // Makes the JWT module available globally
          }),
          inject: [ConfigService],
        })
  ],
})
export class CommentModule {}
