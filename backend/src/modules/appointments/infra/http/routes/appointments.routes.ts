/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date().required(),
    }
}), appointmentsController.create);

appointmentsRouter.get('/fromprovider', providerAppointmentsController.index);

export default appointmentsRouter;
