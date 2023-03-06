import { decodeToken } from 'jsontokens'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { adminStore } from './store/user'

function CheckToken(): string | null {
	const store = adminStore()

	const token = localStorage.getItem('token')
	if (token === null) return '/login'
	const tokendata = decodeToken(token).payload as any
	console.log(tokendata)
	if (tokendata.admin == 1) store.admin = true
	if (tokendata.admin == 0) store.admin = false

	if (new Date(tokendata['exp'] * 1000) <= new Date()) {
		return '/login'
	}

	return null
}

const routes: RouteRecordRaw[] = [
	{
		component: () => import('./views/login.vue'),
		name: 'login',
		path: '/login',
	},
	{
		component: () => import('./views/dashboard.vue'),
		name: 'dashboard',
		path: '/',
		beforeEnter: (_to, _from, next) => {
			var check = CheckToken()
			if (check !== null) {
				next({ name: 'login' })
			} else {
				next()
			}
		},
		children: [
			{
				component: () => import('./views/pages/home.vue'),
				name: 'home',
				path: '/',
			},
			{
				component: () => import('./views/pages/buscar.vue'),
				name: 'buscar',
				path: '/buscar',
			},
			{
				component: () => import('./views/pages/calendar.vue'),
				name: 'calendar',
				path: '/cal/:dni/:mes/:year',
				props: true,
			},
			{
				component: () => import('./views/pages/doc.vue'),
				name: 'doc',
				path: '/doc',
			},
		],
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: 'active',
})
