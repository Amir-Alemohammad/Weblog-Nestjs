import { User } from "src/users/entities/user.entity";
import{Entity , Column , PrimaryGeneratedColumn , ManyToOne , JoinColumn} from "typeorm"

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
    
    @Column("int",{nullable:true , default : [] , array : true})
    likes : number[];
    
    @Column("int",{nullable:true , default : [] , array:true})
    comments : number[];

    @Column("int",{nullable:false})
    @ManyToOne( () => User,(user) => user.id)
    @JoinColumn({name:'user'})
    user: User
}
