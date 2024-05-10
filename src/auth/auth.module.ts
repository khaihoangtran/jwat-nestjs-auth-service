import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { JwtService } from './service/jwt.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, JwtService],
  imports: [
    JwtModule.register({
      secret: 'tkh',
      signOptions: { expiresIn: '4h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
