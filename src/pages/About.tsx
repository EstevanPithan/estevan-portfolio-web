import heroBackground from '@/assets/hero-background.jpg'
import profilePhoto from '@/assets/profile-photo.jpg'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import experienceData from '@/data/experience.json'
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react'

export default function About() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section
				className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${heroBackground})` }}
			>
				<div className="bg-background/40 absolute inset-0 backdrop-blur-sm" />
				<div className="container relative z-10 text-center">
					<h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
						Hi, I'm <span className="text-primary">Estevan Pithan</span>
					</h1>
					<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
						Frontend Engineer & UI Enthusiast crafting beautiful, accessible web experiences with modern technologies
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							className="transition-spring hover:scale-105"
						>
							<ExternalLink className="mr-2 h-4 w-4" />
							Hire me
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="transition-spring hover:scale-105"
						>
							<Download className="mr-2 h-4 w-4" />
							Download CV
						</Button>
					</div>
				</div>
			</section>

			{/* Bio Section */}
			<Section>
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<h2 className="mb-6 text-3xl font-bold tracking-tight">About Me</h2>
						<div className="text-muted-foreground space-y-6">
							<p>
								I'm a passionate frontend engineer with over 6 years of experience building scalable web applications
								and intuitive user interfaces. My journey began with a curiosity for how websites work, which evolved
								into a deep appreciation for the intersection of design and technology.
							</p>
							<p>
								I specialize in React, TypeScript, and modern CSS frameworks, with a keen eye for performance
								optimization and accessibility. I believe that great software should not only function flawlessly but
								also provide delightful user experiences.
							</p>
							<p>
								When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects,
								or sharing knowledge through technical writing and mentoring.
							</p>
						</div>

						<div className="mt-6 flex flex-wrap gap-2">
							{['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'].map((skill) => (
								<Badge
									key={skill}
									variant="secondary"
									className="transition-smooth hover:bg-primary hover:text-primary-foreground"
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>

					<div className="flex justify-center lg:justify-end">
						<Avatar className="shadow-large h-80 w-80">
							<AvatarImage
								src={profilePhoto}
								alt="Estevan Pithan"
							/>
							<AvatarFallback className="text-4xl">EP</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</Section>

			{/* Journey Timeline */}
			<Section className="bg-muted/30">
				<SectionHeader
					title="My Journey"
					description="A timeline of my professional growth and key milestones"
				/>

				<div className="mx-auto max-w-4xl">
					<div className="space-y-8">
						<div className="bg-card shadow-soft transition-smooth hover:shadow-medium flex items-center gap-4 rounded-lg p-6">
							<div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-semibold">
								<Calendar className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold">Started Learning Web Development</h3>
								<p className="text-muted-foreground">2017 • Self-taught HTML, CSS, and JavaScript</p>
							</div>
						</div>

						<div className="bg-card shadow-soft transition-smooth hover:shadow-medium flex items-center gap-4 rounded-lg p-6">
							<div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-semibold">
								<MapPin className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold">First Professional Role</h3>
								<p className="text-muted-foreground">2018 • Full Stack Developer at StartupXYZ</p>
							</div>
						</div>

						<div className="bg-card shadow-soft transition-smooth hover:shadow-medium flex items-center gap-4 rounded-lg p-6">
							<div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-semibold">
								<ExternalLink className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<h3 className="text-lg font-semibold">Specialized in Frontend</h3>
								<p className="text-muted-foreground">2020 • Focused on React and modern frontend technologies</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Experience Section */}
			<Section>
				<SectionHeader
					title="Professional Experience"
					description="Companies I've had the privilege to work with"
				/>

				<div className="grid gap-6 md:grid-cols-2">
					{experienceData.map((exp) => (
						<Card
							key={exp.id}
							className="shadow-soft transition-smooth hover:shadow-medium p-6"
						>
							<div className="flex items-start gap-4">
								<img
									src={exp.logoUrl}
									alt={`${exp.company} logo`}
									className="h-12 w-12 rounded-lg object-cover"
								/>
								<div className="flex-1">
									<h3 className="text-lg font-semibold">{exp.company}</h3>
									<p className="text-primary font-medium">{exp.role}</p>
									<p className="text-muted-foreground mb-3 text-sm">{exp.period}</p>
									<p className="text-muted-foreground text-sm">{exp.summary}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Section>
		</div>
	)
}
