import{AppointmentApi} from "../../dict/api/appointment/types";
import { ApiImplementation } from "../../dict/types";
import { appointmentServiceImpl } from "./appointments";

export class ServiceImplementation implements ApiImplementation {
	appointment: AppointmentApi = appointmentServiceImpl;
}
