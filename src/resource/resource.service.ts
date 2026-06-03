import {Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto } from './dto/resource-create.dto';
import { Resource } from 'generated/prisma/client';

@Injectable()
export class ResourceService {
    constructor(private prisma: PrismaService,) {}

    async createResource(resource: CreateResourceDto): Promise<Resource> {
        return this.prisma.resource.create({
            data: {
                ...resource,
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }
}