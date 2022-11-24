# Appointment

## Operations

### postAppointmentCreate

```http
POST /appointment/create
```


### deleteAppointmentDelete

```http
DELETE /appointment/delete
```


### getAppointmentGet

```http
GET /appointment/get
```


### getAppointmentGetAll

```http
GET /appointment/getAll
```


### putAppointmentUpdate

```http
PUT /appointment/update/{id}
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function postAppointmentCreate(request: Api.AppointmentDt | undefined): Promise<t.PostAppointmentCreateResponse> {
	throw 'Unimplemented'
}

async function deleteAppointmentDelete(id: string): Promise<t.DeleteAppointmentDeleteResponse> {
	throw 'Unimplemented'
}

async function getAppointmentGet(id: string): Promise<t.GetAppointmentGetResponse> {
	throw 'Unimplemented'
}

async function getAppointmentGetAll(limit: number | null | undefined, direction: Api.DirectionParamEnum | undefined, sortByField: string | null | undefined): Promise<t.GetAppointmentGetAllResponse> {
	throw 'Unimplemented'
}

async function putAppointmentUpdate(id: string | undefined, request: Api.AppointmentDt | undefined): Promise<t.PutAppointmentUpdateResponse> {
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
```
