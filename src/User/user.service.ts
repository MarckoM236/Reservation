import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update-dto';

@Injectable()
export class UserService{

    constructor(private prisma: PrismaService,) {}

    getUsers(): any{
        return this.prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
            },
        });
    }

    getUserById(id: number): any{
        return this.prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
            },
        });
    }

    async createUser(user: CreateUserDto): Promise<any> {
        const exists = await this.prisma.users.findUnique({
            where: {
            email: user.email,
            },
        });

        if (exists) {
            throw new ConflictException('Email already exists');
        }

        return this.prisma.users.create({
            data: {
                ...user,
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        });
    }

    async updateUser(user: UpdateUserDto,id: number): Promise<any> {
        const user_exist = await this.prisma.users.findUnique({
            where: {
            id: id
            },
        });

        if (!user_exist) {
            throw new NotFoundException('User not found');
        }

        if (user.email) {
            const exists = await this.prisma.users.findFirst({
                where: {
                email: user.email,
                NOT: {id},
                },
            });

            if (exists) {
                throw new ConflictException('Email already exists');
            }
        }

        return this.prisma.users.update({
            where: {
                id: id,
            },
            data: {
                ...user,
                updated_at: new Date()
            }
        });
    }

    async deleteUser(id: number): Promise<any> {
        const user_exist = await this.prisma.users.findUnique({
            where: {
            id: id
            },
        });

        if (!user_exist) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.users.delete({
            where: {
                id: id,
            }
        });
    }
}