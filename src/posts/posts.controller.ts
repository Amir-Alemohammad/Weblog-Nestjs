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
  @UseGuards(jwtAuthGuard)
  findAll(@Request() request) {
    return this.postsService.findAll(request);
  }

  @Get(':id')
  @UseGuards(jwtAuthGuard)
  findOne(@Param('id') id: string , @Request() request) {
    return this.postsService.findOne(+id,request);
  }
  @Get('slugs/:slug')
  @UseGuards(jwtAuthGuard)
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(jwtAuthGuard)
  @UseInterceptors(uploadFile)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() request) {
    return this.postsService.update(+id, updatePostDto , request);
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuard)
  remove(@Param('id') id: string , @Request() request) {
    return this.postsService.remove(+id,request);
  }


}
