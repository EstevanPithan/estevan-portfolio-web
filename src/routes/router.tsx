import Layout from '@/components/layout/Layout'
import About from '@/pages/About'
import ArticleDetail from '@/pages/ArticleDetail'
import Articles from '@/pages/Articles'
import Hire from '@/pages/Hire'
import NotFound from '@/pages/NotFound'
import Projects from '@/pages/Projects'
import { createBrowserRouter, RouteObject } from 'react-router'
import { Navigate, Outlet } from 'react-router'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Layout>
				<Outlet />
			</Layout>
		),
		children: [
			{
				index: true,
				element: (
					<Navigate
						to="/about"
						replace
					/>
				),
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'projects',
				element: <Projects />,
			},
			{
				path: 'articles',
				element: <Articles />,
			},
			{
				path: 'articles/:slug',
				element: <ArticleDetail />,
			},
			{
				path: 'hire',
				element: <Hire />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]

export const router = createBrowserRouter(routes)
