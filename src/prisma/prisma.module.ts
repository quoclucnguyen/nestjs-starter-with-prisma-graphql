import { Module } from '@nestjs/common';
import { PrismaAppService } from './prisma.app.service';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService, PrismaAppService],
    exports: [PrismaService, PrismaAppService],

})
export class PrismaModule {

}
