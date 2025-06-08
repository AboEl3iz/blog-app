import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';
import { RefreshTokenSchema } from './entities/refreshtoken.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService,MongooseModule], // Export AuthService and JwtModule for use in other modules
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
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
export class AuthModule { }
