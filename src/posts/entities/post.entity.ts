import { User } from "src/users/entities/user.entity";
import{Entity , Column , PrimaryGeneratedColumn , ManyToOne , JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany,} from "typeorm"
import {PostLikes} from "./postLike.entity"


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
    
    @Column("int",{array : true , default : []})
    @OneToMany(() => PostLikes,postlike => postlike.blog)
    @JoinColumn({name: "likes"})
    likes : PostLikes[];
    
    @Column("int",{nullable:true , default : [] , array:true})
    comments : number[];

    @Column("int",{nullable:false})
    @ManyToOne( () => User,(author) => author.id)
    @JoinColumn({name:'author'})
    author: User

    @Column("int",{nullable : true , array : true , default:[]})
    bookmarks : number[];

    @Column({nullable:false,default:""})
    slug: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date
}
