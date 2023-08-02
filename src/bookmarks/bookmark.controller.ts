import {Controller, Request, UseGuards, Param, Get } from "@nestjs/common";
import { jwtAuthGuard } from "src/guard/jwt-auth.guard";
import { BookmarkService } from "./bookmark.service";

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService:BookmarkService ) {}

  @Get("add/:id")
  @UseGuards(jwtAuthGuard)
  addLike(@Param('id') id:number , @Request() request){
    return this.bookmarkService.addBookmark(id,request)
  }
 
  
}