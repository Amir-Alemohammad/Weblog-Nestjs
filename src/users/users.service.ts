import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async createUser(data: CreateUserDto) {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return{
      statusCode: 201,
      message: "user Created!"
    }
  }
  async findUserByEmail(email: string){
    return await this.userRepository.findOne({
      where:{
        email
      },
    });
  }
  async updateUser(email:string,code:number){
    const user = await this.findUserByEmail(email);
    user.code = code;
    return await this.userRepository.save(user);
  }
}
