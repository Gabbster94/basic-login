import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import UsersService from "./users.service";

@Injectable()
export class SignUpGuard implements CanActivate
{
  constructor(private readonly usersService: UsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean>
  {
    const { email, name } = context.switchToHttp().getRequest().body as CreateUserDto;

    const doesEmailExist = await this.usersService.findUnique(email);

    if (doesEmailExist)
      throw new BadRequestException("User already exists!");

    const doesNameExist = await this.usersService.findByName(name);

    if (doesNameExist)
      throw new BadRequestException("Sorry, name already taken");

    return true;
  }
}