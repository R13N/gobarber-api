import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { ShowProfileService } from './services/show-profile.service';
import { UpdateProfileService } from './services/update-profile.service';

@Controller('users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private showProfileService: ShowProfileService,
    private updateProfileService: UpdateProfileService,
  ) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.createUserService.execute(createUserDTO);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
