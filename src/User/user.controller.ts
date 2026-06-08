import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user-create.dto';
import { UpdateUserDto } from './dtos/user-update-dto';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { UserResponse } from './types/user.type';
import { ApiOkResponse, ApiOperation,ApiResponse,ApiTags } from '@nestjs/swagger';
import { SuccessResponse, ErrorResponse } from 'src/common/swagger/response';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  
  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Users found successfully',
    isArray: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Cosme',
          },
          email: {
            type: 'string',
            example: 'cosme@test.com',
          },
          status: {
            type: 'boolean',
            example: true,
          },
          createdAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            example: '2023-01-01T00:00:00.000Z',
          },
        },
      },
    },
  })
  async getUsers(): Promise<UserResponse[]> {
    return await this.UserService.getUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
  })
  @ApiOkResponse({
    description: 'User found successfully',
    schema: {
      properties:{
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Fulanito' },
          email: { type: 'string', example: 'fulanito@test.com' },
          status: { type: 'boolean', example: true },
          createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: ErrorResponse('User not found'),
  })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    return await this.UserService.getUserById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiOkResponse({
    description: 'User created successfully',
    schema: SuccessResponse({
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Fulanito' },
      email: { type: 'string', example: 'fulanito@test.com' },
    }, 'User created successfully')
  })
  async createUser(@Body() user: CreateUserDto): Promise<ResponseInterface<UserResponse>> {
    
    let create = await this.UserService.createUser(user);

    return {
      success: true,
      message: 'User created successfully',
      data: create
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiOkResponse({
    description: 'User updated successfully',
    schema: SuccessResponse({
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Fulanito' },
      email: { type: 'string', example: 'fulanito@test.com' },
    }, 'User updated successfully')
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: ErrorResponse('User not found'),
  })
  async updateUser(@Body() user: UpdateUserDto, @Param('id', ParseIntPipe) id: number): Promise<ResponseInterface<UserResponse>> {

    let update = await this.UserService.updateUser(user, id);

    return {
      success: true,
      message: 'User updated successfully',
      data: update
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
    schema: SuccessResponse({
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Fulanito' },
      email: { type: 'string', example: 'fulanito@test.com' },
    }, 'User deleted successfully')
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: ErrorResponse('User not found'),
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseInterface<UserResponse>> {
    let deleted = await this.UserService.deleteUser(id);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deleted
    };
  }

}