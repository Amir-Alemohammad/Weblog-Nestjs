import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';


export class UpdatePostDto extends PartialType(CreatePostDto) {
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
