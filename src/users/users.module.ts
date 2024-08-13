import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BlockService } from '../blocks/block.service';
import { BlockController } from '../blocks/block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ignore, IgnoreSchema } from '../database/ignore.schema';
import { User, UserSchema } from '../database/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Ignore.name, schema: IgnoreSchema }])
  ],
  controllers: [UsersController, BlockController],
  providers: [UsersService, BlockService],
})
export class UsersModule {}