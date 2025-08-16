
import Home from '@/pages/home/Home'
import { createBrowserRouter, RouteObject } from 'react-router'

export const routes: RouteObject[] = [
	{
		path: '/',
		Component: Home,
	},
	{
		path: '/home',
		Component: Home,
	},
]

export const router = createBrowserRouter(routes)
