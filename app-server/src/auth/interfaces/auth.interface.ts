export interface JwtPayload {
  username: string;
  sub: number;
}

export interface LoginUserRes {
  name: string;
  token: string;
  email: string;
}

export interface RefreshAuthRes {
  name: string;
  token: string;
  email: string;
}

export interface RefreshAuthReq {
  email: string;
  token: string;
}
