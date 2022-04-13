"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const ensureAuthenticated_1 = __importDefault(require("@shared/infra/http/middlewares/ensureAuthenticated"));
const appointmentsRepository_1 = __importDefault(require("@modules/appointments/repositories/appointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("@modules/appointments/services/CreateAppointmentService"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointmentsRepository_1.default);
    const appointments = yield appointmentsRepository.find();
    return response.json(appointments);
}));
appointmentsRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { provider_id, date } = request.body;
    const parsedDate = (0, date_fns_1.parseISO)(date);
    const createAppointmentService = new CreateAppointmentService_1.default();
    const appointment = yield createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });
    return response.json(appointment);
}));
exports.default = appointmentsRouter;
