import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs_db'),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
