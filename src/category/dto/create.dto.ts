import {IsString,IsNotEmpty,Length, IsNumber, IsEmpty,} from "class-validator"
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCommentDto {
    @IsString()
    @Length(4)
    @IsNotEmpty()
    @ApiProperty({type:"string",name:"title"})
    title : string;
    @IsNumber()
    @IsEmpty()
    @ApiProperty({type:"integer",name:"parentId"})
    parentId: number;
}