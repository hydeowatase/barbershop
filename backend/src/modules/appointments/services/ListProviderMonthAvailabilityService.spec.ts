
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'any_id',
            date: new Date(2022, 3, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'any_id',
            date: new Date(2022, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'any_id',
            date: new Date(2022, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'any_id',
            date: new Date(2022, 4, 22, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id: 'any_id',
                year: 2022,
                month: 5,
            }
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, availability: true },
                { day: 20, availability: false },
                { day: 21, availability: true },
                { day: 22, availability: false },
            ])
        );

    });

});
