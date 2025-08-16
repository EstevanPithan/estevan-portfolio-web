import { cn } from '@/lib/utils'

interface SectionProps {
	children: React.ReactNode
	className?: string
	id?: string
}

export function Section({ children, className, id }: SectionProps) {
	return (
		<section
			id={id}
			className={cn('py-16 md:py-24', className)}
		>
			<div className="container">{children}</div>
		</section>
	)
}

interface SectionHeaderProps {
	title: string
	description?: string
	className?: string
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
	return (
		<div className={cn('mb-12 text-center', className)}>
			<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
			{description && <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{description}</p>}
		</div>
	)
}
