import { IsString, IsUUID } from 'class-validator';
import { Match } from 'src/modules/shared/decorators/match.decorator';

export class ResetPasswordDTO {
  @IsUUID()
  token: string;
  @IsString()
  password: string;
  @Match('password')
  password_confirmation: string;
}
