import { IsDate, IsString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsString()
  provider_id: string;
  @IsDate()
  date: Date;
}
