import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateRequest,
  ValidateResponse,
} from '../proto/auth';
import { RegisterDto } from './dtos/auth.register.dto';
import { LoginDto } from './dtos/auth.login.dto';
import { ValidateDto } from './dtos/auth.validate.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'register')
  register(payload: RegisterDto): Promise<RegisterResponse> {
    return this.authService.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'login')
  login(payload: LoginDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'validate')
  validate(payload: ValidateDto): Promise<ValidateResponse> {
    return this.authService.validate(payload);
  }
}
