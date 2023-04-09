import { registro } from '../src/store/asistencia'
import { ApiClient } from './api'
import { Marcaciones } from './models/empleado'

async function buscarRegistros(
	dni: string,
	mes: number,
	year: number
): Promise<Marcaciones> {
	try {
		const data = await ApiClient.post<Marcaciones>('/asistencia', {
			dni,
			mes,
			year,
		})
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

async function buscarAsistencia(
	dni: string,
	mes: number,
	year: number
): Promise<Array<registro>> {
	try {
		const data = await ApiClient.post<any>('/asistencia/search', {
			dni,
			mes,
			year,
		})
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

async function asistenciaDD(
	dni: string,
	fecha: string,
	falta: boolean,
	tardanza: number | null
): Promise<Array<registro>> {
	try {
		const data = await ApiClient.post<any>('/asistencia/add', {
			dni,
			fecha,
			falta,
			tardanza,
		})
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}

async function EliminarAsistencia(dni: string, fecha: string): Promise<void> {
	try {
		await ApiClient.post<any>('/asistencia/eliminar', {
			dni,
			fecha,
		})
	} catch (error) {
		throw error
	}
}

function getMonthName(mes: number) {
	const monthNames = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octobre',
		'Noviembre',
		'Deciembre',
	]

	return monthNames[mes - 1]
}

export {
	buscarRegistros,
	getMonthName,
	buscarAsistencia,
	asistenciaDD,
	EliminarAsistencia,
}
