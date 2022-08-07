import { injectable, inject } from 'tsyringe';

import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { Index } from 'typeorm';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

/*
* Return of this service
* [{ day: 1, available: false }, { day: 2, available: true }...]
*/
type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
        const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        });

        const numberOfDaysinMonth = getDaysInMonth(
            new Date(year, month - 1)
        );

        const eachDayArray = Array.from(
            { length: numberOfDaysinMonth },
            (_, index) => index + 1,
        );

        console.log(eachDayArray);

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointmentsInMonth.filter(appointment => {
                return getDate(appointment.date) === day;
            })

            return {
                available: appointmentsInDay.length < 10,
                day,
            }
        });

        console.log(availability);

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
