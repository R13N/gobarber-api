import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { StorageProvider } from 'src/shared/providers/StorageProvider/models/StorageProvider';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@Injectable()
export class UpdateUserAvatarService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('StorageProvider')
    private readonly storageProvider: StorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}
