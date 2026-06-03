import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update-dto';
import { UserResponse } from './types/user.type';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService{

    constructor(private prisma: PrismaService, private auth: AuthService) {}

    async getUsers(): Promise<UserResponse[]> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
            }
        });

        return users;
    }

    async getUserById(id: number): Promise<UserResponse> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async createUser(user: CreateUserDto): Promise<UserResponse> {
        const exists = await this.prisma.user.findUnique({
            where: {
            email: user.email,
            }
        });

        if (exists) {
            throw new ConflictException('Email already exists');
        }

        //encrypt password before saving to database
        user.password = await this.auth.hashPassword(user.password);

        return this.prisma.user.create({
            data: {
                ...user,
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    async updateUser(user: UpdateUserDto,id: number): Promise<UserResponse> {
        const user_exist = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user_exist) {
            throw new NotFoundException('User not found');
        }

        if (user.email) {
            const exists = await this.prisma.user.findFirst({
                where: {
                email: user.email,
                NOT: {id},
                },
            });

            if (exists) {
                throw new ConflictException('Email already exists');
            }
        }

        //encrypt password if password is being updated
        if (user.password) {
            user.password = await this.auth.hashPassword(user.password);
        }

        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                ...user,
                updated_at: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    async deleteUser(id: number): Promise<UserResponse> {
        const user_exist = await this.prisma.user.findUnique({
            where: {
            id: id
            },
        });

        if (!user_exist) {
            throw new NotFoundException('User not found');
        }

        return this.prisma.user.delete({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                created_at: true,
                updated_at: true
            }
        });
    }
}