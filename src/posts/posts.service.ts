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

    const slug = post.title.replace(/ /g,"-");

    post.slug = slug;

    post.author = request.user.id;
    
    post.image = request.body.image;

    post.image = post.image.replace(/\\/g,"/")


    const postcreate = await this.postRepository.save(post)
    
    
    
    return {
      statusCode: HttpStatus.CREATED,
      message: "post created!"
    }
  }

  async findAll(request:any) {
    const author = request.user.id;
    const posts = await this.postRepository.find({
      where:{
        author
      }
    });
    if(posts.length <= 0) throw new HttpException("There is no Post",HttpStatus.NOT_FOUND)
    return {
      statusCode: HttpStatus.OK,
      posts,
    }
  }

  async findOne(id: number,request:any) {
    const author = request.user.id;
    const post = await this.postRepository.findOne({
      where:{
        id,
        author,
      }
    });
    if(!post) throw new HttpException("There is no Post",HttpStatus.NOT_FOUND)
    return {
      statusCode: HttpStatus.OK,
      post,
    }
  }

  async findBySlug(slug:string){
    const post = await this.postRepository.findOne({
      where:{
        slug,
      },
      select: ['title' , "author" , "comments" , "image" , "likes" , "description"]
    });
    if(!post) throw new HttpException("Post Not Found",HttpStatus.NOT_FOUND)
    return {
      statusCode : HttpStatus.OK,
      post
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto , request) {
    const author = request.user.id;
    const post = await this.postRepository.findOne({
      where:{
        id,
        author
      },
      
    });

    if(!post) throw new HttpException("Post Not Found",HttpStatus.NOT_FOUND);
    

    let slug = updatePostDto.title
    slug = slug.replace(/ /g,"-");

    

    let image = request.body.image;
    image = post.image.replace(/\\/g,"/")
    
    const updateResult = await this.postRepository.update(id,{...updatePostDto , image, slug})

    
    return {
      statusCode: HttpStatus.OK,
      message: "Your post has been successfully edited"
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
