import { Documento, DetalleDocumentos } from '../app/models/documentos'
import { ApiClient } from './api'

import { toast } from 'vue3-toastify'

async function buscarDoc(nombres: string): Promise<Documento> {
	try {
		const data = await ApiClient.post<any>('/doc/search', { nombre: nombres })
		return data
	} catch (error) {
		throw error
	}
}

async function buscarDocByName(nombres: string): Promise<Documento> {
	try {
		const data = await ApiClient.post<any>('/doc/searchByName', {
			nombre: nombres,
		})
		return data
	} catch (error) {
		throw error
	}
}

async function buscardDetallesDocumentos(id: number): Promise<Documento> {
	try {
		const data = await ApiClient.post<any>('/doc/searchDetalle', {
			id,
		})
		return data
	} catch (error) {
		throw error
	}
}

async function Guardar(doc: Documento, detalle: DetalleDocumentos[]) {
	try {
		const data = await ApiClient.post<Documento>('/doc/create', {
			...doc,
			detalle: detalle,
		})
		toast(`${data.docId}`, { autoClose: 600 })
	} catch (error) {
		toast(error as string, { autoClose: 600 })
	}
}

function AbrevAsuntos(asunto: string) {
	switch (asunto) {
		case 'JUSTIFICADO':
			return {
				abr: 'JT',
				class: 'bg-azure',
				bg: 'bg-azure-lt',
			}
		case 'DF':
			return {
				abr: 'DF',
				class: 'bg-rss',
				bg: 'bg-rss-lt',
			}
		case 'ONOMASTICO':
			return {
				abr: 'ON',
				class: 'bg-green',
				bg: 'bg-green-lt',
			}
		case 'HORASEXTRAS':
			return {
				abr: 'HE',
				class: 'bg-green',
				bg: '',
			}
		case 'OMISION':
			return {
				abr: 'OM',
				class: 'bg-indigo',
				bg: '',
			}
		case 'LICENCIA':
			return {
				abr: 'LC',
				class: 'bg-dribbble-lt',
				bg: '',
			}
		case 'SANSION':
			return {
				abr: 'SC',
				class: 'bg-dribbble-lt',
				bg: '',
			}
		case 'DFXHEL':
			return {
				abr: 'XHE',
				class: 'bg-youtube',
				bg: '',
			}
		case 'AC':
			return {
				abr: 'AC',
				class: 'bg-dribbble-lt',
				bg: '',
			}
		case 'DM':
			return {
				abr: 'DM',
				class: 'bg-dribbble',
				bg: 'bg-dribbble-lt',
			}
		default:
			return {
				abr: 'OT',
				class: 'bg-dribbbble-lt',
				bg: '',
			}
	}
}

export {
	buscarDoc,
	Guardar,
	AbrevAsuntos,
	buscarDocByName,
	buscardDetallesDocumentos,
}
