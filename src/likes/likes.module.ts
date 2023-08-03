import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikeController } from "./likes.controller";
import { LikeService } from "./likes.service";
import { Likes } from "./entities/Like.entity";
import { PostsService } from "src/posts/posts.service";
import { Post } from "src/posts/entities/post.entity";
import { functions } from "src/utils/functions";
import { Comment } from "src/comment/entities/comment.entity";
import { Bookmarks } from "src/bookmarks/entities/bookmark.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Likes , Post , Comment , Bookmarks])],
    controllers: [LikeController],
    providers: [LikeService , PostsService , functions],
  })
  export class LikeModule {}