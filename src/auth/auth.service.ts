import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';
import { RefreshToken } from './entities/refreshtoken.schema';
import { ConfigService } from '@nestjs/config';
import { PayloadTokenDTO } from './dto/jwt.payload.dto';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authrepository: Model<Auth>,
    @InjectModel('RefreshToken') private readonly refrechrepository: Model<RefreshToken>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }
  async Sigup(createAuthDto: CreateAuthDto) {
    const user = await this.authrepository.findOne( { email: createAuthDto.email } );
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createAuthDto.password, salt);
    createAuthDto.password = hashPassword;
    if (createAuthDto.roletoken === this.configService.get<string>('ADMIN_TOKEN')) {
      createAuthDto.role = 'admin'; // Assign admin role if the roletoken matches
    } else {
      createAuthDto.role = 'member'; // Default to member role
    }
    return this.authrepository.create(createAuthDto);
  }

  async login(LoginDto: LoginAuthDto) {
    const user = await this.authrepository.findOne({  email: LoginDto.email });
    
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    const isMatch = await bcrypt.compare(LoginDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    //TODO: Generate JWT token here
    const token = this.generateJwtToken({
      userId: user.id,
      roles: user.role, // Assuming roles is a string or array of strings
    })
    // For now, we will just return the user object
    return token;
  }

  async refreshToken(refreshDTo: RefreshTokenDTO) {
    const { refreshtoken } = refreshDTo;
    const existingToken = await this.refrechrepository.findOneAndDelete({  refreshtoken: refreshtoken  });

    if (!existingToken) {
      throw new BadRequestException('No refresh token found for this user');
    }


    if (existingToken.expirationDate < new Date()) {
      throw new BadRequestException('Refresh token has expired');
    }

    const user = await this.authrepository.findOne( { _id: existingToken.userId } ); // Delete the old refresh token
    const newTokens = this.generateJwtToken({
      userId: existingToken.userId,
      roles: user!.role, // Assuming roles is a string or array of strings
    });

    return newTokens;
  }

  private storerefreshToken(token: string, userId: string) {
    this.refrechrepository.findOne({ where: { userId } }).then(async (existingToken) => {
      if (existingToken) {
        existingToken.refreshtoken = token;
        existingToken.expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set expiration date to 7 days from now
        await this.refrechrepository.create(existingToken);
      } else {
        const newToken = this.refrechrepository.create({
          userId,
          refreshtoken: token,
          expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration date to 7 days from now
        });
        await this.refrechrepository.create(newToken);
      }
    });


  }

  getProfile(userId: string) {
    const userprofile = this.authrepository.findOne({_id: userId }).select('-password -_id'); // Assuming you want to populate the role field with its name
    if (!userprofile) {
      throw new BadRequestException('User not found');
    }
    return userprofile;
  }
  private generateJwtToken(paloadtoken: PayloadTokenDTO) {
    const refreshtroken = uuidv4();
    this.storerefreshToken(refreshtroken, paloadtoken.userId); // Store the refresh token in the database
    // Implement JWT token generation logic here
    const accesstoken = this.jwtService.sign(paloadtoken, { secret: process.env.JWT_SECRET, expiresIn: '1h' }); // Use the JwtService to sign the payload
    // For example, using the JwtService from @nestjs/jwt
    return {
      accessToken: accesstoken,
      refreshToken: refreshtroken, // Assuming you want to return both access and refresh tokens
    }; // Return the generated token
  }
}
