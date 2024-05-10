import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @Field((type) => ID)
  userId: string;

  @Column({ name: 'full_name', type: 'varchar', length: 50 })
  @Field((type) => String)
  fullName: string;

  @Column({ name: 'user_name', type: 'varchar', length: 50 })
  @Field((type) => String)
  userName: string;

  @Column({ name: 'email', type: 'varchar', length: 50, unique: true })
  @Field((type) => String)
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  @Field((type) => String)
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field((type) => String)
  role: UserRole;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @Field((type) => Date)
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @Field((type) => Date)
  updatedAt: Date;
}
