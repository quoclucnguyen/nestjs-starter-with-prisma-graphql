import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { isReturnStatement, updateRestTypeNode } from 'typescript';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { PrismaAppService } from 'src/prisma/prisma.app.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaAppService: PrismaAppService) { }


  create(createUserInput: CreateUserInput) {
    const passwordHash = bcrypt.hashSync(createUserInput.password, 10);
    return this.prismaAppService.prismaService.user.create({
      data: {
        username: createUserInput.username,
        name: createUserInput.name,
        email: createUserInput.email,
        password: passwordHash,
        role: createUserInput.role
      }
    })
  }

  findAll() {
    return this.prismaAppService.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaAppService.prismaService.user.findFirst({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prismaAppService.prismaService.user.update({
      where: {
        id: id
      },
      data: updateUserInput
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByUsername(username: string) {
    return this.prismaAppService.prismaService.user.findFirst({
      where: {
        username: username,
        isActive: true
      }
    })
  }
}
