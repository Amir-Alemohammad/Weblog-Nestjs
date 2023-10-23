import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Comment } from "./entities/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { PostsService } from "../posts/posts.service";


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly postService: PostsService
  ) { }
  async createComment(id: number, createCommentDto: CreateCommentDto, request) {
    const user = request.user;
    const blog = await this.postService.findById(id);
    const comment = this.commentRepository.create({
      blog,
      text: createCommentDto.text,
      user,
    });
    const result = await this.commentRepository.save(comment).then(comment => {
      return comment
    }).catch(err => {
      console.log(err)
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Comment Created!"
    }
  }
  async confirmComment(id: number, request) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      }
    });
    if (!comment) throw new HttpException("Comment Not Found", HttpStatus.NOT_FOUND)
    if (comment.openToComment && comment.show) throw new HttpException("Comment has open for blog", HttpStatus.BAD_REQUEST)
    comment.openToComment = true;
    comment.show = true;
    const result = await this.commentRepository.save(comment).then(comment => {
      return comment
    }).catch(err => {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Comments are open for the blog!"
    }
  }
}