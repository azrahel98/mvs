export interface EmpleadoVw {
	dni?: string | null
	nombre?: string | null
	ingreso?: string | null
	area?: string | null
	cargo?: string | null
}

export interface Empleado {
	dni: string
	nombre: string
	area: number | string
	regimen: string
	/**  Defaults to: NULL. */
	ingreso: Date | null
	/**  Defaults to: NULL. */
	renuncia: number | null
	/**  Defaults to: NULL. */
	salida: Date | null
	/**  Defaults to: NULL. */
	sueldo: number | null
	cargo: number | string
}

export interface Marcaciones {
	registros: [
		{
			dni: string
			entrada: string
			salida: string
			tardanza: string
			date: string
		}
	]
	ranges: [
		{
			dni: string
			doc: number
			det: number
			inicio: string
			fin: string
			asunto: string
			descripcion: string
			referencia: string
		}
	]
	doc: [
		{
			dni: string
			doc: number
			det: number
			fecha: string
			asunto: string
			descripcion: string
			referencia: string
		}
	]
}
