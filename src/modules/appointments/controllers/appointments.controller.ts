import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateAppointmentDTO } from '../dto/create-appointment.dto';
import { CreateAppointmentService } from '../services/create-appointment.service';
import { ListProvidersService } from '../services/list-providers.service';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
    private readonly listProvidersService: ListProvidersService,
  ) {}

  @Post()
  create(@Req() req, @Body() { date, provider_id }: CreateAppointmentDTO) {
    return this.createAppointmentService.execute({
      date,
      provider_id,
      user_id: req.user.id,
    });
  }

  @Get('me')
  me(@Req() req) {
    return this.listProvidersService.execute({ user_id: req.user.id });
  }
}
