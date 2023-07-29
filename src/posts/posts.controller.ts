import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors , UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { jwtAuthGuard } from 'src/guard/jwt-auth.guard';
import uploadFile from "../utils/multer"


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("/create")
  @UseGuards(jwtAuthGuard)
  @UseInterceptors(uploadFile)
  create(@Body() createPostDto: CreatePostDto , @Request() request) {
    return this.postsService.create(createPostDto , request);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
