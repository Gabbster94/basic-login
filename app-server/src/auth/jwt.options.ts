import { JwtSignOptions } from "@nestjs/jwt";

export const jwtOptions: JwtSignOptions = {
  secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME
};
