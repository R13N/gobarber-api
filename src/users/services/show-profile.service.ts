import { Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import User from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

interface IRequest {
  user_id: string;
}

@Injectable()
export class ShowProfileService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
