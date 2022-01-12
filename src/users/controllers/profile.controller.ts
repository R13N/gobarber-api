import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { UpdateProfileDTO } from '../dto/update-profile.dto';
import { ShowProfileService } from '../services/show-profile.service';
import { UpdateProfileService } from '../services/update-profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private showProfileService: ShowProfileService,
    private updateProfileService: UpdateProfileService,
  ) {}

  @Get()
  create(@Req() req) {
    return this.showProfileService.execute(req.user.id);
  }

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
