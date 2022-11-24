import { Api } from "../../../dict/models";
import * as t from "../../../dict/api/appointment/types";
import * as v from "../../../dict/validation";
import { db } from "../../db";


export class appointmentService {
	private readonly collectionName: string;

	constructor() {
		this.collectionName = "Appointment-1";
		this.getALL = this.getALL.bind(this);
		this.post = this.post.bind(this);
		this.delete = this.delete.bind(this);
		this.get = this.get.bind(this);
		this.put = this.put.bind(this);
	}

	/* *
	 ! Todo: Implement pagination for this service
	*/
	async getALL(limit: number | null | undefined, direction: Api.DirectionParamEnum |
		undefined, sortByField: string | null | undefined): Promise<t.GetAppointmentGetAllResponse> {
		try {
			const AppointmentQuerySnap = await db.collection(`${this.collectionName}`).get();
			const AppointmentTem: Api.AppointmentDt[] = AppointmentQuerySnap.docs
				.map((doc) => doc.data())
				.map((json) => v.modelApiAppointmentDtFromJson("Appointment", json));
			return {
				status: 200,
				body: {
					items: AppointmentTem,
					totalCount: AppointmentTem.length,
				},
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async get(id: string | undefined): Promise<t.GetAppointmentGetResponse> {
		try {
			const AppointmentDocSnap = await db.doc(`${this.collectionName}/${id}`).get();
			if (!AppointmentDocSnap.exists) {
				throw new Error("no-Appointment-found");
			}
			const Appointment = v.modelApiAppointmentDtFromJson("Appointment", AppointmentDocSnap.data());
			return {
				status: 200,
				body: Appointment,
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("no-Appointment-found")) {
				return {
					status: 404,
					body: {
						message: "No Appointment found with given id",
					},
				};
			}
			throw error;
		}
	}


	async post(request: Api.AppointmentDt | undefined): Promise<t.PostAppointmentCreateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.id) {
				throw new Error("no-uId-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.id);
			try {
				await this._checkUserExists(request.id);
			} catch (error: any) {
				if (error.toString().match("no-Appointment-found")) {
					await Ref.set({
						...request,
						isExist: true,
						id: Ref.id,
						createdAt: new Date().toISOString(),
					});
					return {
						status: 201,
						body: request,
					};
				}
			}
			throw new Error("Appointment-already-exists");
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "Invalid request",
					},
				};
			}

			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "No id found in request",
					},
				};
			}

			if (error.toString().match("Appointment-already-exists")) {
				return {
					status: 422,
					body: {
						message: "Appointment already exists with given uid",
					},
				};
			}
			throw error;
		}
	}

	async put(id: string | undefined, request: Api.AppointmentDt | undefined): Promise<t.PutAppointmentUpdateResponse> {
		try {
			if (!request) {
				throw new Error("invalid-inputs");
			}

			if (!request.id) {
				throw new Error("no-uId-found");
			}

			const Ref = db.collection(`${this.collectionName}`).doc(request.id);

			// checking whether BP_patients exists or not
			const Res = await this._checkUserExists(request.id);
			await Ref.update({
				...request,
				updatedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					...Res,
					...request,
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "Invalid request",
					},
				};
			}

			if (error.toString().match("invalid-inputs")) {
				return {
					status: 422,
					body: {
						message: "No id found in request",
					},
				};
			}

			throw error;
		}
	}

	async delete(id: string): Promise<t.DeleteAppointmentDeleteResponse> {
		try {
			await this._checkUserExists(id);
			const Ref = db.collection(`${this.collectionName}`).doc(id);
			await Ref.delete({
				// isExist: false,
				// deletedAt: new Date().toISOString(),
			});
			return {
				status: 200,
				body: {
					message: "Appointment deleted successfully",
				},
			};
		} catch (error: any) {
			console.error(error);
			if (error?.response?.status === 404) {
				return {
					status: 404,
					body: {
						message: "Appointment already deleted or no Appointment found",
					},
				};
			}
			throw error;
		}
	}

	private async _checkUserExists(id: string) {
		const response = await this.get(id);
		if (response.status === 404) {
			throw new Error("no-Appointment-found");
		}
		return response.body;
	}
}