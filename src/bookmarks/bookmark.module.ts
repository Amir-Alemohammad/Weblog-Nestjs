import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookmarkService } from "./bookmark.service";
import { Bookmarks } from "./entities/bookmark.entity";
import { PostsService } from "src/posts/posts.service";
import { Post } from "src/posts/entities/post.entity";
import { functions } from "src/utils/functions";
import { BookmarkController } from "./bookmark.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Bookmarks , Post])],
    controllers: [BookmarkController],
    providers: [BookmarkService , PostsService , functions],
  })
  export class BookmarkModule {}