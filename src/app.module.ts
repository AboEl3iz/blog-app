import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GenerateAiModule } from './generate-ai/generate-ai.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, PostModule, CommentModule, DashboardModule, GenerateAiModule, ConfigModule.forRoot(
    {
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env',
      load: [configuration],

    }
  ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
