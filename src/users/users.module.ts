import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { UsersController } from './users.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [FindUserByEmailService],
  exports: [FindUserByEmailService],
})
export class UsersModule {}
