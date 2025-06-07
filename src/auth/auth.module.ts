import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
    ]),
  ],
})
export class AuthModule { }
