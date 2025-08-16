import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section, SectionHeader } from '@/components/ui/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import projectsData from '@/data/projects.json'
import { ExternalLink, Calendar, Building } from 'lucide-react'
import { useState } from 'react'

interface Project {
	id: string
	category: 'professional' | 'personal'
	title: string
	summary: string
	imageUrl: string
	linkUrl?: string
	year?: number
	company?: string
	tags: string[]
}

export default function Projects() {
	const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional')

	const projects = projectsData as Project[]
	const filteredProjects = projects.filter((project) => project.category === activeTab)

	return (
		<div className="min-h-screen py-16">
			<Section>
				<SectionHeader
					title="Projects"
					description="A showcase of my work spanning professional projects and personal experiments"
				/>

				<Tabs
					value={activeTab}
					onValueChange={(value) => setActiveTab(value as 'professional' | 'personal')}
					className="w-full"
				>
					<TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
						<TabsTrigger
							value="professional"
							className="transition-smooth"
						>
							Professional
						</TabsTrigger>
						<TabsTrigger
							value="personal"
							className="transition-smooth"
						>
							Personal
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="professional"
						className="mt-12"
					>
						<ProjectGrid projects={filteredProjects} />
					</TabsContent>

					<TabsContent
						value="personal"
						className="mt-12"
					>
						<ProjectGrid projects={filteredProjects} />
					</TabsContent>
				</Tabs>
			</Section>
		</div>
	)
}

function ProjectGrid({ projects }: { projects: Project[] }) {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{projects.map((project) => (
				<Card
					key={project.id}
					className="shadow-soft hover:shadow-medium overflow-hidden transition-all duration-300 hover:-translate-y-1"
				>
					<div className="aspect-video overflow-hidden">
						<img
							src={project.imageUrl}
							alt={project.title}
							className="transition-smooth h-full w-full object-cover hover:scale-105"
						/>
					</div>

					<CardHeader>
						<div className="flex items-start justify-between gap-2">
							<CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
							{project.linkUrl && (
								<Button
									size="icon"
									variant="ghost"
									asChild
									className="shrink-0"
								>
									<a
										href={project.linkUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View ${project.title} project`}
									>
										<ExternalLink className="h-4 w-4" />
									</a>
								</Button>
							)}
						</div>

						<div className="text-muted-foreground flex items-center gap-4 text-sm">
							{project.year && (
								<div className="flex items-center gap-1">
									<Calendar className="h-3 w-3" />
									{project.year}
								</div>
							)}
							{project.company && (
								<div className="flex items-center gap-1">
									<Building className="h-3 w-3" />
									{project.company}
								</div>
							)}
						</div>
					</CardHeader>

					<CardContent className="pt-0">
						<CardDescription className="mb-4 line-clamp-3">{project.summary}</CardDescription>

						<div className="flex flex-wrap gap-1">
							{project.tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="transition-smooth hover:bg-primary hover:text-primary-foreground text-xs"
								>
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
