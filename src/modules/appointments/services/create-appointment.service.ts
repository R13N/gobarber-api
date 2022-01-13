import { Injectable } from '@nestjs/common';
import { getHours, isBefore, startOfHour } from 'date-fns';
import { AppError } from 'src/modules/shared/errors/AppError';
import Appointment from '../entities/appointment.entity';
import { AppointmentsRepository } from '../repositories/appointments.repository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@Injectable()
export class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(new Date(date));

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You cant't create an appointment on past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate({
        date: appointmentDate,
        provider_id,
      });

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.createAppointment({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    // const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    // await this.notificationsRepository.create({
    //   recipient_id: provider_id,
    //   content: `Novo agendamento para dia ${dateFormatted}.`,
    // });

    return appointment;
  }
}
