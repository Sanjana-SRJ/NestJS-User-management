import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { User, UserSchema } from '../database/users.schema';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }

  @Post('search')
    async search(
      @Query('username') username?: string, 
      @Query('minAge') minAge?: number, 
      @Query('maxAge') maxAge?: number
    ): Promise<User[]> {
      const filter: any = {};

      // Handle username filtering
      if (username) {
        filter.username = { $regex: username, $options: 'i' }; // Use regex for case-insensitive search
      }

      // Handle age filtering
      if (minAge || maxAge) {
        filter.birthdate = {}; // Initialize birthdate object

        const currentDate = new Date();

        if (minAge) {
          const minBirthdate = new Date(currentDate.setFullYear(currentDate.getFullYear() - Number(minAge)));
          filter.birthdate.$lte = minBirthdate; // $lte for minimum age
        }

        if (maxAge) {
          const maxBirthdate = new Date(currentDate.setFullYear(currentDate.getFullYear() - Number(maxAge)));
          filter.birthdate.$gte = maxBirthdate; // $gte for maximum age
        }
      }

      // Call the service with the constructed filter
      return this.userService.search(username, minAge, maxAge); // Pass parameters to the service
    }
} 