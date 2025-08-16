import { Footer } from '../Footer'
import { Header } from '../Header'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="w-full">{children}</main>
			<Footer />
		</div>
	)
}
