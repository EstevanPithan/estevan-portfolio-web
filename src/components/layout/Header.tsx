import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'

const navigation = [
	{ name: 'About', href: '/about' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Articles', href: '/articles' },
	{ name: 'Hire me', href: '/hire' },
]

export function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()

	const isActive = (href: string) => {
		if (href === '/about' && location.pathname === '/') return true
		return location.pathname.startsWith(href)
	}

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container flex h-16 items-center justify-between">
				<Link
					to="/about"
					className="flex items-center space-x-2"
				>
					<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold">
						EP
					</div>
					<span className="font-semibold">Estevan Pithan</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
					{navigation.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							className={cn(
								'transition-smooth hover:text-foreground/80',
								isActive(item.href) ? 'text-foreground' : 'text-foreground/60',
							)}
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="flex items-center space-x-2">
					<ThemeToggle />

					{/* Mobile Navigation */}
					<Sheet
						open={isOpen}
						onOpenChange={setIsOpen}
					>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[300px] sm:w-[400px]"
						>
							<div className="flex items-center justify-between">
								<Link
									to="/about"
									className="flex items-center space-x-2"
									onClick={() => setIsOpen(false)}
								>
									<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold">
										EP
									</div>
									<span className="font-semibold">Estevan Pithan</span>
								</Link>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsOpen(false)}
								>
									<X className="h-5 w-5" />
								</Button>
							</div>
							<nav className="mt-8 flex flex-col space-y-4">
								{navigation.map((item) => (
									<Link
										key={item.href}
										to={item.href}
										className={cn(
											'transition-smooth hover:text-foreground/80 text-lg font-medium',
											isActive(item.href) ? 'text-foreground' : 'text-foreground/60',
										)}
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
