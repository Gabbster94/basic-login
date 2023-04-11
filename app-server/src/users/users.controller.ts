import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignUpGuard } from "./sign-up.guard";
import UsersService from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(SignUpGuard)
  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<void> {
    return this.userService.create(createUser);
  }
}
