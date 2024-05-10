// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               v5.26.1
// source: src/proto/user.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum userRole {
  ADMIN = 0,
  USER = 1,
  UNRECOGNIZED = -1,
}

export interface createUserDto {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

export interface updateUserDto {
  fullName?: string | undefined;
  userName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface searchUserDto {
  fullName?: string | undefined;
  userName?: string | undefined;
  email?: string | undefined;
  limit?: number | undefined;
  role?: userRole | undefined;
}

export interface findUserByIdDto {
  userId: string;
}

export interface updateUserByIdDto {
  userId: string;
  userDto: updateUserDto | undefined;
}

export interface Users {
  user: User[];
}

export interface User {
  userId: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: userRole;
  createdAt: Date | undefined;
  deletedAt?: Date | undefined;
  updatedAt: Date | undefined;
}

export const USER_PACKAGE_NAME = "user";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface UserServiceClient {
  create(request: createUserDto): Observable<User>;

  findAll(request: searchUserDto): Observable<Users>;

  findOneById(request: findUserByIdDto): Observable<User>;

  update(request: updateUserByIdDto): Observable<User>;

  delete(request: findUserByIdDto): Observable<User>;
}

export interface UserServiceController {
  create(request: createUserDto): Promise<User> | Observable<User> | User;

  findAll(request: searchUserDto): Promise<Users> | Observable<Users> | Users;

  findOneById(request: findUserByIdDto): Promise<User> | Observable<User> | User;

  update(request: updateUserByIdDto): Promise<User> | Observable<User> | User;

  delete(request: findUserByIdDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findOneById", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";