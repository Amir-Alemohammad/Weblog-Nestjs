import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostLikes } from './entities/postLike.entity';
import { functions } from 'src/utils/functions';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Comment } from './entities/comment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Post , PostLikes , User , Comment])],
  controllers: [PostsController],
  providers: [PostsService , functions , UsersService],
})
export class PostsModule {}
