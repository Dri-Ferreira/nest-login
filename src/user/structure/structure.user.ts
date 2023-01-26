import { User } from '@prisma/client';

export type ICreateUserParams = {
  id?: string;
  email: string;
  password: string;
  name: string;
};

export interface IcreateUserService {
  execute(params: ICreateUserParams): Promise<Partial<User>>;
}
