import { User } from "src/users/entities/user.entity";
import{Entity , Column , PrimaryGeneratedColumn , ManyToOne , JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany,} from "typeorm"
import {PostLikes} from "./postLike.entity"
import { Comment } from "./comment.entity";


@Entity("Post")
export class Post {
    
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({nullable:false})
    title : string;
    
    @Column({nullable:false})
    image : string;
    
    @Column({nullable:false})
    description : string;
    
    @Column("simple-array",{array:true,default:[]})
    @OneToMany(() => PostLikes,postlike => postlike.blog)
    likes : PostLikes[];
    
    @Column("json",{nullable:true , default : [] , array:true})
    @OneToMany(() => Comment,(comment) => comment.comment )
    comments : Comment[];

    @Column("int",{nullable:false})
    @ManyToOne( () => User,(author) => author.id)
    @JoinColumn({name:'author'})
    author: User

    @Column("int",{nullable : true , array : true , default:[]})
    @OneToMany( () => User , (user) => user.id)
    bookmarks : User[];

    @Column({nullable:false,default:""})
    slug: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date
}
