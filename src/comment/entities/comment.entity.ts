import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Exclude } from "class-transformer";

@Entity("Comment")
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((_type) => User, (user) => user.blog_comments, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User

    @Column({ nullable: false })
    text: string;

    @ManyToOne((_type) => Post, (blog) => blog.comments, { eager: false })
    @Exclude({ toPlainOnly: true })
    blog: Post

    @Column({ nullable: false, default: false })
    show: boolean

    @Column({ nullable: false, default: false })
    openToComment: boolean

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date
}