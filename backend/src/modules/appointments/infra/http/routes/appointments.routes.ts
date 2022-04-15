/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentsRepository();
  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository,
  );

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
