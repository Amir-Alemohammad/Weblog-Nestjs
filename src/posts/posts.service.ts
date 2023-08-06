import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm'
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { functions } from 'src/utils/functions';
import { Likes } from 'src/likes/entities/Like.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Bookmarks } from 'src/bookmarks/entities/bookmark.entity';
import slugify from 'slugify';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Likes)
    private likeRepositroy : Repository<Likes>,
    @InjectRepository(Comment)
    private commentRepositroy : Repository<Comment>,
    @InjectRepository(Bookmarks)
    private bookmarkRepositroy : Repository<Bookmarks>,
    private functions: functions,
    
  ) {}

  async create(createPostDto: CreatePostDto, request: any) {

    if (!request.body.image) throw new HttpException("Image is Required", HttpStatus.BAD_REQUEST)

    const post = this.postRepository.create(createPostDto)


    //create slug for blog
    post.slug = slugify(post.title,{
      remove: /[*+~.()'"!:@]/g
    });
    console.log(post.slug)

    post.author = request.user.id;

    post.image = request.body.image;

    post.image = post.image.replace(/\\/g, "/")


    const postcreate = await this.postRepository.save(post)



    return {
      statusCode: HttpStatus.CREATED,
      message: "post created!"
    }
  }

  async findAll(request: any) {
    const author = request.user.id;
    const posts = await this.postRepository.find({
      where: {
        author
      }
    });
    if (posts.length <= 0) throw new HttpException("There is no Post", HttpStatus.NOT_FOUND)
    return {
      statusCode: HttpStatus.OK,
      posts,
    }
  }

  async findOne(id: number, request: any) {
    const author = request.user.id;
    const post = await this.postRepository.findOne({
      where: {
        id,
        author,
      }
    });
    if (!post) throw new HttpException("There is no Post", HttpStatus.NOT_FOUND)
    return {
      statusCode: HttpStatus.OK,
      post,
    }
  }

  async findById(id:number){
    const post = await this.postRepository.findOne({
      where:{
        id
      }
    });
    if (!post) throw new HttpException("There is no Post", HttpStatus.NOT_FOUND)
    return post;
  }


  async findBySlug(slug: string) {
    console.log(slug)
    const post = await this.postRepository.findOne({
      where:{
        slug
      }
    });
    if (!post) throw new HttpException("Post Not Found", HttpStatus.NOT_FOUND)
    return {
      statusCode: HttpStatus.OK,
      post
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto, request) {
    const author = request.user.id;
    const post = await this.postRepository.findOne({
      where: {
        id,
        author
      },

    });

    post.author = request.user.id;

    if (!post) throw new HttpException("Post Not Found", HttpStatus.NOT_FOUND);


    let slug = updatePostDto.title
    slug = slug.replace(/ /g, "-");



    let image = request.body.image;
    image = post.image.replace(/\\/g, "/")

    const updateResult = await this.postRepository.update(id, { ...updatePostDto, image, slug })


    return {
      statusCode: HttpStatus.OK,
      message: "Your post has been successfully edited"
    }
  }

  async remove(id: number, request) {
    const author = request.user.id;
    const post = await this.postRepository.findOne({
      where: {
        id,
        author,
      }
    });
    const likePost = await this.likeRepositroy.findOne({
      where:{
        blogId:id,
      }
    });
    const commentPost = await this.commentRepositroy.findOne({
      where:{
        blog:{
          id
        }
      }
    });
    const bookmarkPost = await this.bookmarkRepositroy.findOne({
      where:{
        blogId:id
      }
    });
    if(likePost !== null) this.likeRepositroy.remove(likePost)
    
    if(commentPost !== null) this.commentRepositroy.remove(commentPost)
    
    if(bookmarkPost !== null) this.bookmarkRepositroy.remove(bookmarkPost)

    if (!post) throw new HttpException("Post Not Found", HttpStatus.NOT_FOUND)
    
    this.functions.deleteFileInPublic(post.image);
    await this.postRepository.remove(post);
    return {
      statusCode: HttpStatus.OK,
      message: "Your post has been successfully Deleted"
    }
  }
}
