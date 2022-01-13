import { EntityRepository, Raw, Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { FindAllInDayFromProviderDTO } from './dto/find-all-in-day-from-provider.dto copy';
import { FindAllInMonthFromProviderDTO } from './dto/find-all-in-month-from-provider.dto';
import { FindByDateDTO } from './dto/find-by-date.dto';
import Appointment from './entities/appointment.entity';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate({
    date,
    provider_id,
  }: FindByDateDTO): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date, provider_id },
    });
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: FindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: FindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async createAppointment({
    provider_id,
    user_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.create({
      provider_id,
      user_id,
      date,
    });

    await this.save(appointment);

    return appointment;
  }
}
