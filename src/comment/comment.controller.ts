import { Body, Controller, Request, UseGuards , Post, Param } from "@nestjs/common";
import { jwtAuthGuard } from "src/guard/jwt-auth.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService ) {}

  @Post("/create/:id")
  @UseGuards(jwtAuthGuard)
  create(@Param('id') id:number,@Body() createCommentDto:CreateCommentDto  , @Request() request) {
    return this.commentService.createComment(id,createCommentDto , request)
  }
}