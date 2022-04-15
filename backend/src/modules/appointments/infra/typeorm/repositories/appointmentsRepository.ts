import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepositorie from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// S
// O
// Liskov Substitution Principle
// I
// D

// Camadas onde há integração com bibliotecas, banco de dados etc deve ter a possibilidade de se fazer substituições dessas integrações

class AppointmentsRepository implements IAppointmentsRepositorie {
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

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
