import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async createUser(email: CreateUserDto) {
    const user = this.userRepository.create(email);

    return await this.userRepository.save(user);

  }


  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      },
    });
  }

  async updateUserOtpCode(email: string, code: number) {
    const user = await this.findUserByEmail(email);
    user.code = code;
    return await this.userRepository.save(user);
  }

  async updateUserToken(email: string, token: string) {
    const user = await this.findUserByEmail(email);
    user.accessToken = token;
    return await this.userRepository.save(user);
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      select: ["email", "id"],

    });
    return user
  }

}
