import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import UsersService from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users/users.controller";
import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [
    UsersController,
    AuthController,
  ],
  providers: [
    PrismaService,
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
  ],
})
export class AuthModule { }
