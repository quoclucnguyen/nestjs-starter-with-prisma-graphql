import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AppModule } from 'src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsernameValidator } from './validators/username-validator';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService, UsernameValidator],
  exports: [UserService]
})
export class UserModule { }
