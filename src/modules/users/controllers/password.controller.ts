import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResetPasswordService } from '../services/reset-password.service';
import { SendForgotPasswordEmailService } from '../services/send-forgot-password-email.service';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';

@Controller('password')
@UseInterceptors(ClassSerializerInterceptor)
export class PasswordController {
  constructor(
    private sendForgotPasswordEmailService: SendForgotPasswordEmailService,
    private resetPasswordService: ResetPasswordService,
  ) {}

  @Post('forgot')
  forgotPassword(@Body() { email }: ForgotPasswordDTO) {
    return this.sendForgotPasswordEmailService.execute({ email });
  }

  @Post('reset')
  resetPassword(
    @Body()
    { password, token }: ResetPasswordDTO,
  ) {
    return this.resetPasswordService.execute({
      password,
      token,
    });
  }
}
