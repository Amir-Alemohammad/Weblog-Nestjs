import { HttpException, Injectable , HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Repository} from 'typeorm'
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ){}
  async create(createPostDto: CreatePostDto , request:any) {
    if(!request.body.image) throw new HttpException("Image is Required",HttpStatus.BAD_REQUEST)
    const post = this.postRepository.create(createPostDto)
    
    post.user = request.user.id;
    
    post.image = request.body.image;
    await this.postRepository.save(post)
    return {
      statusCode: 201,
      message: "post created!"
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
