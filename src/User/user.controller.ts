import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update-dto';

@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  getUsers(): any {
    return this.UserService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): any {
    return this.UserService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    
    let create = await this.UserService.createUser(user);

    return {
      success: true,
      message: 'User created successfully',
      data: create
    };
  }

  @Put(':id')
  async updateUser(@Body() user: UpdateUserDto, @Param('id', ParseIntPipe) id: number): Promise<any> {

    let update = await this.UserService.updateUser(user, id);

    return {
      success: true,
      message: 'User updated successfully',
      data: update
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    let deleted = await this.UserService.deleteUser(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deleted
    };
  }

}