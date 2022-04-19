import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: 'uuid--sjdksjdhfkhskdf123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('uuid--sjdksjdhfkhskdf123123');
  });

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 3).toBe(4);
  // });
});
