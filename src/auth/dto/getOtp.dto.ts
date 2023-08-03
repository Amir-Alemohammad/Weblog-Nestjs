import {IsEmail , IsNotEmpty} from "class-validator"
import { ApiProperty } from "@nestjs/swagger/dist";

export class getOtpDto{
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({name:"email" , type:"string",format:"string"})
    email:string;

}