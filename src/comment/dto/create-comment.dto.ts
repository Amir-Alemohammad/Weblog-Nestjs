import { IsString, IsNotEmpty, Length, } from "class-validator"
import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCommentDto {

    @IsString()
    @Length(4)
    @IsNotEmpty()
    @ApiProperty({ type: "string", name: "text" })
    text: string;
}