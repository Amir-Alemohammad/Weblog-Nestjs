import { ApiProperty } from "@nestjs/swagger";
import {IsString,IsNotEmpty,Length,} from "class-validator"

export class CreatePostDto {

    @IsString()
    @Length(4)
    @IsNotEmpty()
    @ApiProperty({name:"title",type:"string"})
    title : string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({name:"description",type:"string"})
    description : string;

    @ApiProperty({name: "image",format:"binary"})
    image:string
}
