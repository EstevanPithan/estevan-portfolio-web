import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const socialLinks = [
	{
		name: 'LinkedIn',
		href: '[LINKEDIN_URL]',
		icon: Linkedin,
	},
	{
		name: 'GitHub',
		href: 'https://github.com/estevanpithan',
		icon: Github,
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/estevanpithan',
		icon: Twitter,
	},
	{
		name: 'Email',
		href: 'mailto:[EMAIL]',
		icon: Mail,
	},
]

export function Footer() {
	return (
		<footer className="bg-muted/50 border-t">
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
						Built by <span className="text-foreground font-medium">Estevan Pithan</span> with React, TypeScript &
						Tailwind CSS.
					</p>
				</div>
				<div className="flex items-center space-x-1">
					{socialLinks.map((link) => (
						<Button
							key={link.name}
							variant="ghost"
							size="icon"
							asChild
							className="transition-smooth hover:bg-accent"
						>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.name}
							>
								<link.icon className="h-4 w-4" />
							</a>
						</Button>
					))}
				</div>
			</div>
		</footer>
	)
}
