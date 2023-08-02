import { Comment } from 'src/comment/entities/comment.entity';
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

    
    // @Column("jsonb",{array:true , default: []})
    // @OneToMany(() => PostLikes, blog => blog.user)
    // blog_likes: PostLikes[]

    

    // @Column("jsonb", { default: [], array: true })
    // @OneToMany(() => Post, (post) => post.bookmarks)
    // blog_bookmarks: Post[]

}
