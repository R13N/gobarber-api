import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Match } from 'src/modules/shared/decorators/match.decorator';

export class ResetPasswordDTO {
  @IsUUID()
  token: string;
  @IsString()
  password: string;
  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  password_confirmation: string;
}
