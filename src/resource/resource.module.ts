import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}