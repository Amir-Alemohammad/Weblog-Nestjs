import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer/dist';
import { PostsModule } from './posts/posts.module';
import { functions } from './utils/functions';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './likes/likes.module';
import { BookmarkModule } from './bookmarks/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // for production mode this property is false
    }),
    MailerModule.forRoot({
      transport: {
        service: "gmail",
        auth: {
          user: "amirho3inalemohammad@gmail.com",
          pass: process.env.EMAIL_PASS
        }
      }
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentModule,
    LikeModule,
    BookmarkModule
  ],
  controllers: [],
  providers: [functions],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
