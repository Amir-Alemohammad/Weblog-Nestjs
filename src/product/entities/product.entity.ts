import { Category } from "src/category/entities/category.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Category, category => category.product, {nullable: true})
    category: Category
}