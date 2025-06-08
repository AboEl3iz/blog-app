import { Module, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [MongooseModule], // Export PostService to be used in other modules
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
    ]),
     JwtModule.registerAsync({
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
export class PostModule {}
