import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostsService } from "src/posts/posts.service";
import { Bookmarks } from "./entities/bookmark.entity";

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmarks)
    private bookmarkRepository: Repository<Bookmarks>,
    private readonly postService: PostsService

  ) { }
  async toggleBookmark(id: number, request) {
    const user = request.user;
    const blog = await this.postService.findById(id)
    if (!blog) throw new HttpException("Post Not Found", HttpStatus.NOT_FOUND);
    const findUserInBookmark = blog?.bookmarks?.find(item => {
      return item.userId == user.id
    })
    if (findUserInBookmark) {
      const deleteResult = await this.bookmarkRepository.remove(findUserInBookmark);
      return {
        message: "the blog has been Unbookmark"
      }
    }
    const createBookmark = this.bookmarkRepository.create({
      blog,
      blogId: blog.id,
      user,
      userId: user.id,
    });
    const result = await this.bookmarkRepository.save(createBookmark)
    return {
      statusCode: 200,
      message: "The Blog Has Been Bookmarked!",
    }

  }
  async getBookmarkedBlog(userId: number) {
    const blog = await this.bookmarkRepository.createQueryBuilder("Bookmarks")
      .leftJoinAndSelect("Bookmarks.blog", "blog")
      .leftJoin("blog.author", "author")
      .addSelect(['author.id', 'author.email'])
      .loadRelationCountAndMap('blog.likes', 'blog.likes')
      .loadRelationCountAndMap('blog.bookmarks', 'blog.bookmarks')
      .loadRelationCountAndMap('blog.comments', 'blog.comments')
      .where({ userId })
      .getManyAndCount()

    return {
      blog
    }

  }

}