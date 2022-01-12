import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
