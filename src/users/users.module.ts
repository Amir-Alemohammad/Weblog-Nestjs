import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { functions } from 'src/utils/functions';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers:[UserController],
  providers: [UsersService, functions]
})
export class UsersModule { }
