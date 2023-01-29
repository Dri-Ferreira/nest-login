import { Request } from 'express';
import { ICreateUserParams } from 'src/user/structure/structure.user';

export interface AuthRequest extends Request {
  user: ICreateUserParams;
}
