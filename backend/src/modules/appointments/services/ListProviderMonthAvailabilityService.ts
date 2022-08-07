import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

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

        console.log(appointmentsInMonth);

        return [{ day: 1, available: false }, { day: 2, available: true }]
    }
}

export default ListProviderMonthAvailabilityService;
