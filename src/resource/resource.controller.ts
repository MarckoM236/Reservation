import {Controller, Post, Body} from '@nestjs/common';
import { CreateResourceDto } from './dto/resource-create.dto';
import { ResourceService } from './resource.service';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { Resource} from 'generated/prisma/client';

@Controller('resources')
export class ResourceController{
    constructor(private ResourceService: ResourceService) {}

    @Post()
    async createResource(@Body() resource: CreateResourceDto): Promise<ResponseInterface<Resource>> {
        let create = await this.ResourceService.createResource(resource);

        return {
        success: true,
        message: 'Resource created successfully',
        data: create
        };
    }
}