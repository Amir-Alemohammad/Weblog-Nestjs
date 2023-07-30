import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { functions } from 'src/utils/functions';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService , functions]
})
export class UsersModule {}
