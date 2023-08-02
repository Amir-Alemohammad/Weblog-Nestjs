import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikeController } from "./likes.controller";
import { LikeService } from "./likes.service";
import { Likes } from "./entities/Like.entity";
import { PostsService } from "src/posts/posts.service";
import { Post } from "src/posts/entities/post.entity";
import { functions } from "src/utils/functions";

@Module({
    imports: [TypeOrmModule.forFeature([Likes , Post])],
    controllers: [LikeController],
    providers: [LikeService , PostsService , functions],
  })
  export class LikeModule {}