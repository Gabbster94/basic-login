import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { IUser } from "../users/interfaces/user.dto";
import { AuthLogoutDto } from "./dto/auth-logout.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Express.Request & any) {
    return this.authService.login(req.user as IUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() authLogoutDto: AuthLogoutDto) {
    return this.authService.logout(authLogoutDto);
  }
}
