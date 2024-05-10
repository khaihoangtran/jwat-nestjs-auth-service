import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dtos/auth.register.dto';
import {
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '@root/src/proto/auth';
import { LoginDto } from '../dtos/auth.login.dto';
import { ValidateDto } from '../dtos/auth.validate.dto';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async register({
    fullName,
    userName,
    email,
    password,
  }: RegisterDto): Promise<RegisterResponse> {
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      return { status: HttpStatus.CONFLICT, error: ['Email already exists'] };
    }
    user = new User();

    user.fullName = fullName;
    user.userName = userName;
    user.email = email;
    user.password = this.jwtService.encodePassword(password);

    await this.repository.save(user);

    return { status: HttpStatus.CREATED, error: null };
  }

  async login({ email, password }: LoginDto): Promise<LoginResponse> {
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Wrong email or password'],
        token: null,
      };
    }

    const isPasswordValid = this.jwtService.isPasswordValid(
      password,
      user.password,
    );

    if (isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Wrong email of password'],
        token: null,
      };
    }

    const token = this.jwtService.generateToken(user);
    return { status: HttpStatus.OK, error: null, token };
  }

  public async validate({ token }: ValidateDto): Promise<ValidateResponse> {
    const decoded: User = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['tToken is invalid'],
        userId: null,
      };
    }

    const auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.userId };
  }
}
