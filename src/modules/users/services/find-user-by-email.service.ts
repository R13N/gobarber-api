import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string): Promise<User | undefined> {
    return this.usersRepository.findByEmail(email);
  }
}
