import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { FindUserByEmailService } from 'src/users/services/find-user-by-email.service';

@Injectable()
export class AuthService {
  constructor(
    private findUserByEmailService: FindUserByEmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmailService.execute(email);

    if (!user) {
      return null;
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}