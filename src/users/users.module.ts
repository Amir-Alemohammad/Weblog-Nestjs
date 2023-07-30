import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { functions } from 'src/utils/functions';
import { PostLikes } from 'src/posts/entities/postLike.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post , PostLikes])],
  providers: [UsersService , functions]
})
export class UsersModule {}
