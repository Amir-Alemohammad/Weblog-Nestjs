import {Controller, Request, UseGuards, Param, Get } from "@nestjs/common";
import { jwtAuthGuard } from "src/guard/jwt-auth.guard";
import { LikeService } from "./likes.service";

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService:LikeService ) {}

  @Get("add/:id")
  @UseGuards(jwtAuthGuard)
  addLike(@Param('id') id:number , @Request() request){
    return this.likeService.addLike(id,request)
  }
 
  
}