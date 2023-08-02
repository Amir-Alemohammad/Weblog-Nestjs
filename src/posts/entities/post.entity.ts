import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm"
import { Comment } from "../../comment/entities/comment.entity";
import {Exclude} from 'class-transformer'
import { Likes } from "src/likes/entities/Like.entity";


@Entity("Post")
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    title: string;

    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    description: string;

    
    @OneToMany((_type) => Likes, like => like.blog , {eager:true})
    likes: Likes[];


    @OneToMany((_type) => Comment, (comment) => comment.blog,{ eager:true })
    comments: Comment[];


    @ManyToOne(_type => User, user => user.blogs, {eager : false})
    @Exclude({toPlainOnly : true})
    author: User


    @Column("jsonb", { nullable: true, array: true, default: [] })
    @OneToMany(() => User, (user) => user.id)
    bookmarks: User[];


    @Column({ nullable: false, default: "" })
    slug: string;


    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date
}
