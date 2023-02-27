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

export { buscarRegistros, getMonthName }
