import {IsString,IsNotEmpty,Length,} from "class-validator"

export class CreatePostDto {

    @IsString()
    @Length(4)
    @IsNotEmpty()
    title : string;
   
    @IsString()
    @IsNotEmpty()
    description : string;
}
