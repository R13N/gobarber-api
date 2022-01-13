import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class UpdateProfileDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @ValidateIf((o) => o.password)
  @IsNotEmpty()
  old_password?: string;

  @IsOptional()
  password?: string;

  @ValidateIf((o) => o.password)
  @Match('password', { message: 'Passwords do not match' })
  @IsNotEmpty()
  password_confirmation?: string;
}
