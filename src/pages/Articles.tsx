import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Section, SectionHeader } from '@/components/ui/section'
import articlesData from '@/data/articles.json'
import { Search, Calendar, LayoutGrid, List, ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link } from 'react-router'

interface Article {
	id: string
	slug: string
	title: string
	date: string
	excerpt: string
	imageUrl?: string
	tags?: string[]
}

type ViewMode = 'grid' | 'list'

export default function Articles() {
	const [searchQuery, setSearchQuery] = useState('')
	const [viewMode, setViewMode] = useState<ViewMode>('grid')
	const [currentPage, setCurrentPage] = useState(1)
	const articlesPerPage = 6

	const articles = articlesData as Article[]

	const filteredArticles = useMemo(() => {
		return articles.filter(
			(article) =>
				article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
		)
	}, [articles, searchQuery])

	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * articlesPerPage
		return filteredArticles.slice(startIndex, startIndex + articlesPerPage)
	}, [filteredArticles, currentPage, articlesPerPage])

	const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return (
		<div className="min-h-screen py-16">
			<Section>
				<SectionHeader
					title="Articles"
					description="Thoughts, tutorials, and insights about web development and design"
				/>

				{/* Search and View Controls */}
				<div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
					<div className="relative w-full sm:w-96">
						<Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
						<Input
							placeholder="Search articles..."
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setCurrentPage(1)
							}}
							className="pl-10"
						/>
					</div>

					<div className="flex gap-2">
						<Button
							variant={viewMode === 'grid' ? 'default' : 'outline'}
							size="icon"
							onClick={() => setViewMode('grid')}
							aria-label="Grid view"
						>
							<LayoutGrid className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === 'list' ? 'default' : 'outline'}
							size="icon"
							onClick={() => setViewMode('list')}
							aria-label="List view"
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Articles */}
				{viewMode === 'grid' ?
					<ArticlesGrid
						articles={paginatedArticles}
						formatDate={formatDate}
					/>
				:	<ArticlesList
						articles={paginatedArticles}
						formatDate={formatDate}
					/>
				}

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="mt-12 flex justify-center gap-2">
						<Button
							variant="outline"
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
						>
							Previous
						</Button>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<Button
								key={page}
								variant={currentPage === page ? 'default' : 'outline'}
								onClick={() => setCurrentPage(page)}
								className="w-10"
							>
								{page}
							</Button>
						))}

						<Button
							variant="outline"
							onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				)}

				{filteredArticles.length === 0 && (
					<div className="py-12 text-center">
						<p className="text-muted-foreground">No articles found matching your search.</p>
					</div>
				)}
			</Section>
		</div>
	)
}

function ArticlesGrid({ articles, formatDate }: { articles: Article[]; formatDate: (date: string) => string }) {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{articles.map((article) => (
				<Card
					key={article.id}
					className="shadow-soft hover:shadow-medium overflow-hidden transition-all duration-300 hover:-translate-y-1"
				>
					{article.imageUrl && (
						<div className="aspect-video overflow-hidden">
							<img
								src={article.imageUrl}
								alt={article.title}
								className="transition-smooth h-full w-full object-cover hover:scale-105"
							/>
						</div>
					)}

					<CardHeader>
						<div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
							<Calendar className="h-3 w-3" />
							{formatDate(article.date)}
						</div>
						<CardTitle className="line-clamp-2">
							<Link
								to={`/articles/${article.slug}`}
								className="hover:text-primary transition-smooth"
							>
								{article.title}
							</Link>
						</CardTitle>
					</CardHeader>

					<CardContent className="pt-0">
						<CardDescription className="mb-4 line-clamp-3">{article.excerpt}</CardDescription>

						{article.tags && (
							<div className="mb-4 flex flex-wrap gap-1">
								{article.tags.slice(0, 3).map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="transition-smooth hover:bg-primary hover:text-primary-foreground text-xs"
									>
										{tag}
									</Badge>
								))}
							</div>
						)}

						<Link to={`/articles/${article.slug}`}>
							<Button
								variant="ghost"
								className="group w-full justify-between"
							>
								Read more
								<ArrowRight className="transition-smooth h-4 w-4 group-hover:translate-x-1" />
							</Button>
						</Link>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

function ArticlesList({ articles, formatDate }: { articles: Article[]; formatDate: (date: string) => string }) {
	return (
		<div className="space-y-6">
			{articles.map((article) => (
				<Card
					key={article.id}
					className="shadow-soft transition-smooth hover:shadow-medium"
				>
					<CardContent className="p-6">
						<div className="flex flex-col gap-6 lg:flex-row">
							{article.imageUrl && (
								<div className="lg:w-48 lg:shrink-0">
									<div className="aspect-video overflow-hidden rounded-lg lg:aspect-square">
										<img
											src={article.imageUrl}
											alt={article.title}
											className="transition-smooth h-full w-full object-cover hover:scale-105"
										/>
									</div>
								</div>
							)}

							<div className="flex-1">
								<div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
									<Calendar className="h-3 w-3" />
									{formatDate(article.date)}
								</div>

								<h3 className="mb-3 text-xl font-semibold">
									<Link
										to={`/articles/${article.slug}`}
										className="hover:text-primary transition-smooth"
									>
										{article.title}
									</Link>
								</h3>

								<p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>

								<div className="flex items-center justify-between">
									{article.tags && (
										<div className="flex flex-wrap gap-1">
											{article.tags.slice(0, 3).map((tag) => (
												<Badge
													key={tag}
													variant="secondary"
													className="transition-smooth hover:bg-primary hover:text-primary-foreground text-xs"
												>
													{tag}
												</Badge>
											))}
										</div>
									)}

									<Link to={`/articles/${article.slug}`}>
										<Button
											variant="ghost"
											className="group"
										>
											Read more
											<ArrowRight className="transition-smooth ml-2 h-4 w-4 group-hover:translate-x-1" />
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
