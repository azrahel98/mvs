import { Empleado, EmpleadoVw } from './models/empleado'
import { ApiClient } from './api'

async function BuscarEmpleado(nombre: string): Promise<EmpleadoVw[]> {
	try {
		const data = await ApiClient.post<EmpleadoVw[]>('/empleado', {
			nombre: nombre,
		})
		return data
	} catch (error) {
		throw error
	}
}

async function BuscarBydni(dni: string): Promise<Empleado> {
	try {
		const data = await ApiClient.post<any>('/empleado/search', { dni: dni })
		return data[0]
	} catch (error) {
		throw error
	}
}

export { BuscarEmpleado, BuscarBydni }
