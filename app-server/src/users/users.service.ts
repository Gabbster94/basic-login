import * as bcrypt from "bcrypt";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async create(createUser: CreateUserDto): Promise<void> {
    const { email, name, password } = createUser;
    const hashedPassword = await this.createHashedPassword(password);

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    });

    const token = this.authService.generateAccessToken({ username: email, sub: newUser.id });

    await this.prismaService.user.update({
      where: { email },
      data: { token }
    });
  }

  async updateUserToken(email: string, token: string): Promise<User> {
    return this.prismaService.user.update({
      where: { email },
      data: { token }
    });
  }

  async findUnique(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findByName(name: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { name } });
  }

  private async createHashedPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return hashedPassword;
  }
}
