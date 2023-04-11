import { Module } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UsersController } from "./users.controller";
import UsersService from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, JwtService, AuthService],
  exports: [UsersService]
})
export class UsersModule { }
