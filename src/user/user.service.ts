import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/cliente';
import * as bcrypt from 'bcrypt';
import { ICreateUserParams, IcreateUserService } from './structure.user';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements IcreateUserService {
  constructor(private readonly prisma: PrismaService) {}
  async execute(params: ICreateUserParams): Promise<Partial<User>> {
    const verify = await this.prisma.user.findUnique({
      where: { email: params.email },
    });

    if (verify) throw new ForbiddenException('user already exists! ');
    const data = {
      ...params,
      password: await bcrypt.hash(params.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
