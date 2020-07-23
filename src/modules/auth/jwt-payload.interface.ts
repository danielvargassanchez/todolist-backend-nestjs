export interface IJwtPayload {
  id: number;
  name: string;
  email: string;
  iat?: Date; //fecha de expiración del token
}
