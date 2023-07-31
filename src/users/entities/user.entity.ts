import { Comment } from 'src/posts/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { PostLikes } from 'src/posts/entities/postLike.entity';
import {Entity , Column , PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm'


@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true , default: "Bearer Token"})
    accessToken: string;

    @Column({unique: true , nullable: false})
    email: string;

    @Column({default: 0})
    code: number;

    @Column("int",{array:true , default:[]})
    @OneToMany(() => PostLikes, blog => blog.user)
    blog_likes: PostLikes[]

    @Column("int",{array:true,default: []})
    @OneToMany( () => Comment , (comment) => comment.user)
    blog_comments: Comment[]


    @Column("int",{default: [] , array:true})
    @OneToMany(() => Post , (post) => post.bookmarks)
    blog_bookMarks: Post[]

}
