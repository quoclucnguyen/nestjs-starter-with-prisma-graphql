import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaAppService {
    private logger = new Logger("PrismaAppService");
    constructor(public readonly prismaService: PrismaService) {
        prismaService.$on<any>('query', (event: Prisma.QueryEvent) => {
            this.logger.debug(`Query: ${event.query} ${event.params}`);
            this.logger.debug('Duration: ' + event.duration + 'ms');
        });
    }
}