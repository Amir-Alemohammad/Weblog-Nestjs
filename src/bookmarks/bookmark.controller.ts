import {Controller, Request, UseGuards, Param, Get } from "@nestjs/common";
import { jwtAuthGuard } from "src/guard/jwt-auth.guard";
import { BookmarkService } from "./bookmark.service";
import { ApiParam , ApiTags } from "@nestjs/swagger";

@ApiTags("BookMark")
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService:BookmarkService ) {}

  @Get("add/:id")
  @UseGuards(jwtAuthGuard)
  @ApiParam({name:"id",type:"number"})
  addLike(@Param('id') id:number , @Request() request){
    return this.bookmarkService.addBookmark(id,request)
  }

  @Get("bookmark-blog/:id")
  @UseGuards(jwtAuthGuard)
  @ApiParam({name:"id",type:"number"})
  getBookmarkedBlog(@Request() request){
    const userId = request.user.id;
    return this.bookmarkService.getBookmarkedBlog(userId)
  }
 
  
}