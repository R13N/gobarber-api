import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import User from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }

  // public async findAllProviders({
  //   except_user_id,
  // }: IFindAllProvidersDTO): Promise<User[]> {
  //   let users: User[];

  //   if (except_user_id) {
  //     users = await this.find({
  //       where: {
  //         id: Not(except_user_id),
  //       },
  //     });
  //   } else {
  //     users = await this.find();
  //   }

  //   return users;
  // }

  public async createUser({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const user = this.create({ name, email, password });

    await this.save(user);

    return user;
  }

  public async saveUser(user: User): Promise<User> {
    return this.save(user);
  }
}
