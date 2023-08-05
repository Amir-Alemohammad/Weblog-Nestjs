import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Likes } from "./entities/Like.entity";
import { PostsService } from "src/posts/posts.service";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes)
    private likeRepository: Repository<Likes>,
    private readonly postService: PostsService
    
  ) {}
    
  async toggleLike(id:number , request) {
        const user = request.user;
        
        const blog = await this.postService.findById(id)
        
        if(!blog) throw new HttpException("Post Not Found",HttpStatus.NOT_FOUND)
         
        const findUserInLike = blog?.likes?.find(item => {
           return item.userId == user.id
        })
           
        if(findUserInLike){
            const deleteResult = await this.likeRepository.remove(findUserInLike);
            return {
                message:"the blog Disliked"
            }
        }
        
        const addLike = this.likeRepository.create({
            blog,
            blogId:blog.id,
            user,
            userId: user.id,
        });

        const result = await this.likeRepository.save(addLike).then(like => {
            return like
        }).catch(error => {
            throw new HttpException("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR)
        });
        
        
        return {
            statusCode: 200,
            message: "blog liked!",
        }              
            
}

}