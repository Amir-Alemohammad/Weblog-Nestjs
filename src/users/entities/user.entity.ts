import { Bookmarks } from 'src/bookmarks/entities/bookmark.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Likes } from 'src/likes/entities/Like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'


@Entity("User")
export class User {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ nullable: true, default: "Bearer Token" })
    accessToken: string;


    @Column({ unique: true, nullable: false })
    email: string;


    @Column({ default: 0 , nullable:true})
    code: number;


    @Column({ default: "USER" , nullable:true})
    Role: string


    @OneToMany((_type) => Comment, (comment) => comment.user , { eager: true })
    blog_comments: Comment[]

    
    @OneToMany((_type) => Post, blog => blog.author, { eager: true })
    blogs: Post[]

    
    @OneToMany((_type) => Likes, blog => blog.user , {eager: true})
    blog_likes: Likes[]

    

    @OneToMany((_type) => Bookmarks, (bookmark) => bookmark.user , {eager: true})
    blog_bookmarks: Bookmarks[]

}
