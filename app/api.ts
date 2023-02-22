class ApiClient {
	static url: string = 'https://grpc.azr4el.com'
	//static url: string = 'http://127.0.0.1:3000'
	static async post<T>(url: string, data: Object): Promise<T> {
		try {
			const req = fetch(`${this.url}${url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Token: `${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(data),
			})
			if (!(await req).ok) throw await (await req).json()
			return (await req).json()
		} catch (error) {
			throw error as Error
		}
	}
}

export { ApiClient }
