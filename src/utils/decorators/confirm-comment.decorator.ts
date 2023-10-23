import { ExecutionContext, HttpException, HttpStatus, createParamDecorator } from "@nestjs/common";

export const UserCheckRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user.Role !== "ADMIN") throw new HttpException("You do not have permission to access", HttpStatus.FORBIDDEN)
  },
);