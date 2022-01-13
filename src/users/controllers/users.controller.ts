import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { UpdateUserAvatarService } from '../services/update-user-avatar.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserAvatarService: UpdateUserAvatarService,
  ) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.createUserService.execute(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.updateUserAvatarService.execute({
      avatarFilename: file.filename,
      user_id: req.user.id,
    });
  }
}
