import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

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
  @Matches('password')
  @IsNotEmpty()
  password_confirmation?: string;
}
