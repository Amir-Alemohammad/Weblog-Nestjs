import {IsString,IsNotEmpty,Length,} from "class-validator"

export class CreateCommentDto {

    @IsString()
    @Length(4)
    @IsNotEmpty()
    text : string;
   
    
}