export interface DetalleDocumentos {
	descripcion: string
	fecha: Date | null | string
	referencia: string | null
	asunto: null | string
	dni: string | null
	inicio: Date | string | null
	fin: Date | string | null
}
// nombre
export interface DetalleDocumentosWithName {
	descripcion: string
	fecha: Date | null | string
	referencia: string | null
	asunto: null | string
	nombre: null | string
	inicio: Date | string | null
	fin: Date | string | null
	activo: number | null
	idDetalle: number | null
}

export interface Documento {
	docId?: number | null
	fecha?: Date | null | string
	tipo: string | null
	nombre: string | null
}

//4655 id doc
