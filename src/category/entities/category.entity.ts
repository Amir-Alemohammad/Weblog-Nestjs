import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class Category{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:string
    @Column({nullable:true})
    parentId:number
    @OneToMany(() => Product , product => product.category, {onDelete: "NO ACTION", nullable: true})
    product: Product[]
} 