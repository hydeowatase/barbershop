import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to create a new appointment.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2022, 4, 10, 13),
      provider_id: 'uuid--sjdksjdhfkhskdf123',
      user_id: 'uuid--sjdksjdhfkhskdf1234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('uuid--sjdksjdhfkhskdf123');
    expect(appointment.user_id).toBe('uuid--sjdksjdhfkhskdf1234');
  });

  it('should not be able to create two appointments on the same time.', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2022, 4, 10, 14);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'uuid--sjdksjdhfkhskdf123',
      user_id: 'uuid--sjdksjdhfkhskdf1234',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: 'uuid--sjdksjdhfkhskdf123',
        user_id: 'uuid--sjdksjdhfkhskdf12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2022, 4, 10, 11),
        provider_id: 'uuid--sjdksjdhfkhskdf123',
        user_id: 'uuid--sjdksjdhfkhskdf1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with the same user as provider.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2022, 4, 10, 13),
        provider_id: 'uuid--sjdksjdhfkhskdf123',
        user_id: 'uuid--sjdksjdhfkhskdf123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside of opening hours(8am after 5pm).', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2022, 4, 11, 7),
        provider_id: 'uuid--sjdksjdhfkhskdf1234',
        user_id: 'uuid--sjdksjdhfkhskdf123',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2022, 4, 11, 18),
        provider_id: 'uuid--sjdksjdhfkhskdf1234',
        user_id: 'uuid--sjdksjdhfkhskdf123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
