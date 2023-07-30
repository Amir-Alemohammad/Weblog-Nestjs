import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLikes } from './entities/postLike.entity';
import { functions } from 'src/utils/functions';

@Module({
  imports: [TypeOrmModule.forFeature([Post , PostLikes])],
  controllers: [PostsController],
  providers: [PostsService , functions],
})
export class PostsModule {}
