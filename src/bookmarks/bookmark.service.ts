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
    
  ) {}
    
  async addBookmark(id:number,request){
    const user = request.user;

    const blog = await this.postService.findById(id)

    if(!blog) throw new HttpException("Post Not Found" , HttpStatus.NOT_FOUND);


    const findUserInBookmark = blog.bookmarks.find(item => {
      return item.userId == user.id
   })
      
   if(findUserInBookmark !== undefined) throw new HttpException("you have Bookmarked this blog for 1 time",HttpStatus.BAD_REQUEST)

    const createBookmark = this.bookmarkRepository.create({
      blog,
      blogId: blog.id,
      user,
      userId: user.id,
    });

    const result = await this.bookmarkRepository.save(createBookmark).then(bookmark => {
      return bookmark
    }).catch(err => {
      throw new HttpException("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR)
    });

    return {
      statusCode: 200,
      message: "The Blog Has Been Bookmarked!",
    }

  }

}