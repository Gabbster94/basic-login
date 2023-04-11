import { ForbiddenException, forwardRef, Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import UsersService from "../users/users.service";
import { jwtOptions } from "./jwt.options";
import { IUser } from "../users/interfaces/user.dto";
import { AuthLogoutDto } from "./dto/auth-logout.dto";
import { JwtPayload, LoginUserRes } from "./interfaces/auth.interface";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<IUser> {
    const user = await this.usersService.findUnique(username);

    if (!user)
      throw new NotAcceptableException("Looks like you don't have an account");

    const { hashedPassword, ...result } = user;
    const passwordValid = await bcrypt.compare(password, hashedPassword);

    if (!passwordValid)
      throw new ForbiddenException("Ops! You entered an invalid password");

    return {
      ...result
    };
  }

  async login(user: IUser): Promise<LoginUserRes> {
    const { email, id } = user;
    const token = this.generateAccessToken({ sub: id, username: email });

    const { name } = await this.usersService.updateUserToken(email, token);

    return {
      email,
      token,
      name,
    };
  }

  async logout(authLogoutDto: AuthLogoutDto): Promise<void> {
    await this.usersService.updateUserToken(authLogoutDto.username, "");
  }

  generateAccessToken(user: JwtPayload): string {
    const { sub, username } = user;
    const payload = { username, sub };
    const accessToken = this.jwtService.sign(payload, jwtOptions);

    return accessToken;
  }
}