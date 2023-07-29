import {IsEmail , IsNotEmpty} from "class-validator"


export class getOtpDto{
    
    @IsEmail()
    @IsNotEmpty()
    email:string;

}