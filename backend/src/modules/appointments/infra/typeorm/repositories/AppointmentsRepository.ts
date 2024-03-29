import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// S
// O
// Liskov Substitution Principle
// I
// D

// Camadas onde há integração com bibliotecas, banco de dados etc deve ter a possibilidade de se fazer substituições dessas integrações

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(parsedDate: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: parsedDate },
    });

    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider(
    {
      provider_id,
      year,
      month
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {

    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'YYYY-MM') = '${year}-${parsedMonth}'`
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider(
    {
      provider_id,
      year,
      month,
      day,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, user_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
