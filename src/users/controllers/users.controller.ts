import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.createUserService.execute(createUserDTO);
  }
}
