import { uuid } from 'uuidv4';

import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(parsedDate: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appoint =>
      isEqual(appoint.date, parsedDate),
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, year, month }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getYear(appointment.date) === year &&
      getMonth(appointment.date) + 1 === month
    );

    return appointments;
  }

  public async findAllInDayFromProvider({ provider_id, year, month, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id === provider_id &&
      getYear(appointment.date) === year &&
      getMonth(appointment.date) + 1 === month &&
      getDate(appointment.date) === day
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
