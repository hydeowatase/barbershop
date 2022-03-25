import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(parsedDate: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: parsedDate },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
