import { router } from '../src/routers'
import { ApiClient } from './api'

async function login(username: string, password: string): Promise<void> {
	try {
		const data = await ApiClient.post<any | Error>('/login', { username, password })

		localStorage.setItem('token', data['token'])
	} catch (e: any) {
		if (e.error.message == 'Usuario no existe') throw { code: 1, message: e.error.message }
		throw { code: 2, message: e.error.message }
	}
}

async function salir(): Promise<void> {
	localStorage.clear()
	router.go(0)
}

export { login, salir }
