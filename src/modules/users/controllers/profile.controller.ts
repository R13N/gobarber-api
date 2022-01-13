import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UpdateProfileDTO } from '../dto/update-profile.dto';
import { ShowProfileService } from '../services/show-profile.service';
import { UpdateProfileService } from '../services/update-profile.service';

@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(
    private showProfileService: ShowProfileService,
    private updateProfileService: UpdateProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req) {
    return this.showProfileService.execute(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Req() req,
    @Body()
    { email, name, old_password, password }: UpdateProfileDTO,
  ) {
    return this.updateProfileService.execute({
      email,
      name,
      old_password,
      password,
      user_id: req.user.id,
    });
  }
}
