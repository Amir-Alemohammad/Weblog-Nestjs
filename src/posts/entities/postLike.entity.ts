import { User } from "src/users/entities/user.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity("PostLikes")
export class PostLikes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blogId: number;

    @Column("json")
    @ManyToOne(() => Post, blog => blog.likes)
    blog: Post;

    @Column()
    userId: string;

    // @Column("json")
    // @ManyToOne(() => User, user => user.blog_likes,
    //  { onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    //    createForeignKeyConstraints: true
    //  })
    // user: User
}
