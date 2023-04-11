import { IsString } from "class-validator";

export class AuthLogoutDto
{
  @IsString()
  public username: string;
}