import * as t from '../api/appointment/types'
import { Api } from '../models'

async function postAppointmentCreate(request: Api.AppointmentDt | undefined): Promise<t.PostAppointmentCreateResponse> {
	throw 'Unimplemented'
}

async function deleteAppointmentDelete(id: string): Promise<t.DeleteAppointmentDeleteResponse> {
	throw 'Unimplemented'
}

async function getAppointmentGet(patientid: string | undefined): Promise<t.GetAppointmentGetResponse> {
	throw 'Unimplemented'
}

async function getAppointmentGetAll(limit: number | null | undefined, direction: Api.DirectionParamEnum | undefined, sortByField: string | null | undefined): Promise<t.GetAppointmentGetAllResponse> {
	throw 'Unimplemented'
}

async function putAppointmentUpdate(patientid: string | undefined, request: Api.AppointmentDt | undefined): Promise<t.PutAppointmentUpdateResponse> {
	throw 'Unimplemented'
}


const api: t.AppointmentApi = {
	postAppointmentCreate,
	deleteAppointmentDelete,
	getAppointmentGet,
	getAppointmentGetAll,
	putAppointmentUpdate,
}

export default api
