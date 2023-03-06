import { defineStore } from 'pinia'

export const adminStore = defineStore('adminStore', {
	state: () => ({ admin: false as boolean }),
})
