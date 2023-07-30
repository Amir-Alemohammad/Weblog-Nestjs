import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import * as path from "path";
import * as fs from 'fs'

@Injectable()
export class functions{
    constructor(
        private readonly maileService : MailerService,
    ){}
    SendEmail(email:string , code:number){
        const maileOption = {
            from: "amirho3inalemohammad@gmail.com",
            to: email,
            subject: "Validation Code",
            text: String(code),
        }
        this.maileService.sendMail(maileOption)
    }
    deleteFileInPublic(fileAddress){
        const filePath = path.join(__dirname , ".." , ".." , "public" , fileAddress);
        fs.unlinkSync(filePath)
    }
}