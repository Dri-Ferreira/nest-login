import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/cliente';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const verify = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (verify) throw new ForbiddenException('user already exists ');

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
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
