import { Module } from '@nestjs/common';
import { AppointmentsController } from './controllers/appointments.controller';
import { CreateAppointmentService } from './services/create-appointment.service';

@Module({
  controllers: [AppointmentsController],
  providers: [CreateAppointmentService],
})
export class AppointmentsModule {}
