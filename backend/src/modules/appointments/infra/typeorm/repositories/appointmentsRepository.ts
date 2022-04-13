import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepositorie from '@modules/appointments/repositories/IAppointmentsRepositorie';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepositorie
{
  public async findByDate(parsedDate: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date: parsedDate },
    });

    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
