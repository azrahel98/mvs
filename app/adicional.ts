import { ApiClient } from './api'

async function buscarFuncinoarios():Promise<object> {
    try {
        const data =  await ApiClient.post('/otros/funcionarios',{})
        return data as object
    } catch (error) {
        throw error
    }
}


export {buscarFuncinoarios }