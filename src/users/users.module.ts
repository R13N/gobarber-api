import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { storageConfig } from 'src/config/storage';
import { SharedModule } from 'src/shared/shared.module';
import { CreateUserService } from './services/create-user.service';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { ShowProfileService } from './services/show-profile.service';
import { UpdateProfileService } from './services/update-profile.service';
import { UpdateUserAvatarService } from './services/update-user-avatar.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([UsersRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: storageConfig.upload.multer.storage,
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    FindUserByEmailService,
    CreateUserService,
    ShowProfileService,
    UpdateProfileService,
    UpdateUserAvatarService,
  ],
  exports: [FindUserByEmailService],
})
export class UsersModule {}
