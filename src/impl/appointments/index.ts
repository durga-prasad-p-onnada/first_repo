import { appointmentService } from "../../impl/appointments/types";
import * as t from "../../../dict/api/appointment/types";

const service = new appointmentService();

export const appointmentServiceImpl: t.AppointmentApi = {
    deleteAppointmentDelete: service.delete,
    getAppointmentGet: service.get,
    getAppointmentGetAll: service.getALL,
    putAppointmentUpdate: service.put,
    postAppointmentCreate: service.post
};