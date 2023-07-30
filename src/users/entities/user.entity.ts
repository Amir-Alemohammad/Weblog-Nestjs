import {Entity , Column , PrimaryGeneratedColumn} from 'typeorm'


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
}
