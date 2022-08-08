import AppError from '@shared/errors/AppError';
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
      provider_id: 'uuid--sjdksjdhfkhskdf123',
      user_id: 'uuid--sjdksjdhfkhskdf1234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('uuid--sjdksjdhfkhskdf123');
    expect(appointment.user_id).toBe('uuid--sjdksjdhfkhskdf1234');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2022, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'uuid--sjdksjdhfkhskdf123',
      user_id: 'uuid--sjdksjdhfkhskdf1234',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'uuid--sjdksjdhfkhskdf123',
        user_id: 'uuid--sjdksjdhfkhskdf1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
