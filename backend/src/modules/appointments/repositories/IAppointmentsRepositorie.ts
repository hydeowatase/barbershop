import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IAppointmentsRepositorie {
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepositorie;
