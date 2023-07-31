import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity , ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./post.entity";

@Entity("Comment")
export class Comment{

    @PrimaryGeneratedColumn()
    id:number

    @Column("int",{nullable:false})
    @ManyToOne( () => User , (user) => user.id)
    user : User

    @Column("int")
    @ManyToOne( () => Post , (post) => post.comments)
    comment: Post

    @Column({nullable:false})
    show : boolean

    @Column({nullable:false})
    openToComment:boolean

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date

}