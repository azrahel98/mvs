import {Documento,DetalleDocumentos} from '../app/models/documentos'
import { ApiClient } from './api'

import { toast } from 'vue3-toastify';


 async function buscarDoc(nombres:string):Promise<Documento> {
    try {
        const data =  await ApiClient.post<any>('/doc/search', {nombre:nombres})
        return data
    } catch (error) {
        throw error
    }
}

async function Guardar(doc:Documento,detalle:DetalleDocumentos[]) {
    try {
        const data =  await ApiClient.post<Documento>('/doc/create', {...doc,detalle:detalle})
        toast(`${data.docId}`,{autoClose:600})
    } catch (error) {
       toast(error as string,{autoClose:600})
    }
}



export { buscarDoc ,Guardar}