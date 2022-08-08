
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the day and hours available from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'any_id_provider',
            user_id: 'any_id_user',
            date: new Date(2022, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'any_id_provider',
            user_id: 'any_id_user',
            date: new Date(2022, 4, 20, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2022, 4, 20, 11).getTime();
        });

        const availabilities = await listProviderDayAvailabilityService.execute(
            {
                provider_id: 'any_id_provider',
                day: 20,
                month: 5,
                year: 2022,
            }
        );

        expect(availabilities).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );

    });
});
