import { ThemeProvider } from './contexts/ThemeContext'
import { router } from './routes/router'
import { Toaster } from '@/components/ui/sonner'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'

type ProvidersProps = {
	router: typeof router
}

export function Providers(props: ProvidersProps) {
	return (
		<StrictMode>
			<ThemeProvider>
				<RouterProvider router={props.router} />
				<Toaster />
			</ThemeProvider>
		</StrictMode>
	)
}
