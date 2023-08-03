import { ApiProperty } from "@nestjs/swagger";
import {IsEmail , IsNotEmpty} from "class-validator"


export class LoginDto{
    
    @ApiProperty({name:"email",type:"string" , format:"string"})
    @IsEmail()
    email:string;

    @ApiProperty({name:"code",type:"number" , format:"number"})
    @IsNotEmpty()
    code: number
}