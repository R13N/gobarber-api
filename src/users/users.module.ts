import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [FindUserByEmailService],
  exports: [FindUserByEmailService],
})
export class UsersModule {}
