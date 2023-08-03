import { Body, Controller, Request, UseGuards , Post, Param, Get } from "@nestjs/common";
import { jwtAuthGuard } from "src/guard/jwt-auth.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiTags , ApiConsumes , ApiParam , ApiBody } from "@nestjs/swagger";

@ApiTags("Comments")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService ) {}

  @Post("/create/:id")
  @UseGuards(jwtAuthGuard)
  @ApiConsumes("application/x-www-form-urlencoded")
  @ApiBody({
    required:true,
    description:"create comment for blog",
    type:CreateCommentDto,
  })
  @ApiParam({name:"id",required:true,type:"number"})
  create(@Param('id') id:number,@Body() createCommentDto:CreateCommentDto  , @Request() request) {
    return this.commentService.createComment(id,createCommentDto , request)
  }

  @Get("/confirm-comment/:id")
  @UseGuards(jwtAuthGuard)
  confirmComment(@Param("id") id:number, @Request() request){
    return this.commentService.confirmComment(id,request)
  }
}