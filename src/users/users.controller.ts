import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { User, UserDocument } from '../database/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: UserDocument): Promise<UserDocument> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UserDocument): Promise<UserDocument> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }

  @Get('search')
  async search(@Query('username') username?: string, @Query('minAge') minAge?: number, @Query('maxAge') maxAge?: number): Promise<UserDocument[]> {
    const filter: any = {};
  
    if (username) {
      filter.username = { $regex: username, $options: 'i' };
    }
  
    if (minAge) {
      filter.age = { $gte: minAge };
    }
  
    if (maxAge) {
      filter.age = { ...filter.age, $lte: maxAge };
    }
  
    return this.userService.search(filter);
    }
} 