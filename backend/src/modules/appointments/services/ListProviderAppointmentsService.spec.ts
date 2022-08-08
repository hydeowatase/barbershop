import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list appointments on a specific day', async () => {

        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'any_id_provider',
            user_id: 'any_id_user',
            date: new Date(2022, 7, 10, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'any_id_provider',
            user_id: 'any_id_user',
            date: new Date(2022, 7, 10, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute(
            {
                provider_id: 'any_id_provider',
                year: 2022,
                month: 8,
                day: 10,
            }
        );

        console.log("Criados", [appointment1, appointment2]);

        console.log("Listados", appointments);

        expect(appointments).toEqual([appointment1, appointment2]);

    });

});
