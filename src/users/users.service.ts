import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async getProfile(request) {
    const userId = request.user.id;
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
      select: ["email", "id"]
    });
    if (!user) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
    return {
      statusCode: 200,
      user,
    }
  }
}
