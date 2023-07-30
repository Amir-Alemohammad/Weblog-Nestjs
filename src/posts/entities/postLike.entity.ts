import { User } from "src/users/entities/user.entity";
import { Entity , Column , ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity("PostLikes")
export class PostLikes{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    blogId: string;

    @Column("int",{array:true})
    @ManyToOne(() => Post, blog => blog.likes)
    blog: Post
    
    @Column()
    userId: string;

    @Column("int",{array:true})
    @ManyToOne(() => User, user => user.blog_likes)
    user: User
}