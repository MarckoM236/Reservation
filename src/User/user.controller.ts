import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update-dto';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { UserResponse } from './types/user.type';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  async asyncgetUsers(): Promise<UserResponse[]> {
    return await this.UserService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse | null> {
    return await this.UserService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<ResponseInterface<UserResponse>> {
    
    let create = await this.UserService.createUser(user);

    return {
      success: true,
      message: 'User created successfully',
      data: create
    };
  }

  @Put(':id')
  async updateUser(@Body() user: UpdateUserDto, @Param('id', ParseIntPipe) id: number): Promise<ResponseInterface<UserResponse>> {

    let update = await this.UserService.updateUser(user, id);

    return {
      success: true,
      message: 'User updated successfully',
      data: update
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseInterface<UserResponse>> {
    let deleted = await this.UserService.deleteUser(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deleted
    };
  }

}