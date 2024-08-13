import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ignore } from '../database/ignore.schema';
import { User } from '../database/users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mydatabase'),
    MongooseModule.forFeature([{ name: User.name, schema: User.schema }]),
    MongooseModule.forFeature([{ name: Ignore.name, schema: Ignore.schema }])
  ],
  controllers: [UsersController, BlockController],
  providers: [UsersService, BlockService],
})
export class UsersModule {}