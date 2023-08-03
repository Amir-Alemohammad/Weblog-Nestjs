import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { PostsService } from "../posts/posts.service";
import { Post } from "src/posts/entities/post.entity";
import { functions } from "src/utils/functions";
import { Likes } from "src/likes/entities/Like.entity";
import { Bookmarks } from "src/bookmarks/entities/bookmark.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment , Post , Likes , Bookmarks])],
    controllers: [CommentController],
    providers: [CommentService , PostsService , functions],
  })
  export class CommentModule {}