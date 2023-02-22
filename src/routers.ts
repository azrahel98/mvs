import { decodeToken } from 'jsontokens'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

function CheckToken():string | null {
	const token = localStorage.getItem('token')
	if (token === null)  return '/login'
	const tokendata = decodeToken(token).payload as any
	if (new Date(tokendata['exp'] * 1000) <= new Date()){
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
		beforeEnter:(_to,_from,next) => {
			var check= CheckToken()
			if (check !== null){
				next({name:'login'})
			}else{
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
				props:true

			},
		],
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: 'active',
})
