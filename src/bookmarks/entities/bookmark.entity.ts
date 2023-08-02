import { User } from "src/users/entities/user.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Exclude } from "class-transformer";

@Entity("Bookmarks")
export class Bookmarks {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blogId: number;

    @ManyToOne((_type) => Post, blog => blog.bookmarks , {eager:false})
    @Exclude({toPlainOnly:true})
    blog: Post;

    @Column()
    userId: string;

    @ManyToOne((_type) => User, user => user.blog_bookmarks,{eager:false})
    @Exclude({toPlainOnly:true})
    user: User
}
