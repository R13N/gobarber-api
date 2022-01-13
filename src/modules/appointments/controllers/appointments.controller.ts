import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateAppointmentDTO } from '../dto/create-appointment.dto';
import { CreateAppointmentService } from '../services/create-appointment.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() { date, provider_id }: CreateAppointmentDTO) {
    return this.createAppointmentService.execute({
      date,
      provider_id,
      user_id: req.user.id,
    });
  }
}
