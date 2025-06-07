import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GenerateAiModule } from './generate-ai/generate-ai.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, PostModule, CommentModule, DashboardModule, GenerateAiModule,ConfigModule.forRoot(
  {
    isGlobal: true, // Makes the configuration available globally
    envFilePath: '.env', 
    load:[configuration],
    
  }
  ),MongooseModule.forRoot(process.env.DATABASE_URL!)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
