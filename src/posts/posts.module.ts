import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { functions } from 'src/utils/functions';
import { Likes } from 'src/likes/entities/Like.entity';
import { Bookmarks } from 'src/bookmarks/entities/bookmark.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes, Post, Comment, Bookmarks]),
  ],
  controllers: [PostsController],
  providers: [PostsService, functions],
})
export class PostsModule { }
