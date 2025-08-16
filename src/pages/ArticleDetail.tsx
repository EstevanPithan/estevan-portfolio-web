import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import articlesData from '@/data/articles.json'
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react'
import { useParams, Link } from 'react-router'

interface Article {
	id: string
	slug: string
	title: string
	date: string
	excerpt: string
	imageUrl?: string
	content: string
	tags?: string[]
}

export default function ArticleDetail() {
	const { slug } = useParams<{ slug: string }>()
	const articles = articlesData as Article[]
	const article = articles.find((a) => a.slug === slug)

	if (!article) {
		return (
			<div className="min-h-screen py-16">
				<Section>
					<div className="text-center">
						<h1 className="mb-4 text-2xl font-bold">Article not found</h1>
						<Link to="/articles">
							<Button variant="outline">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Articles
							</Button>
						</Link>
					</div>
				</Section>
			</div>
		)
	}

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
				<div className="mx-auto max-w-4xl">
					{/* Back Button */}
					<Link
						to="/articles"
						className="mb-8 inline-flex items-center"
					>
						<Button
							variant="ghost"
							className="pl-0"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Articles
						</Button>
					</Link>

					{/* Article Header */}
					<header className="mb-8">
						<div className="text-muted-foreground mb-4 flex items-center gap-2">
							<Calendar className="h-4 w-4" />
							{formatDate(article.date)}
						</div>

						<h1 className="mb-6 text-4xl font-bold tracking-tight">{article.title}</h1>

						<p className="text-muted-foreground mb-6 text-xl">{article.excerpt}</p>

						{article.tags && (
							<div className="flex flex-wrap gap-2">
								{article.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="transition-smooth hover:bg-primary hover:text-primary-foreground"
									>
										{tag}
									</Badge>
								))}
							</div>
						)}
					</header>

					{/* Featured Image */}
					{article.imageUrl && (
						<div className="shadow-medium mb-8 aspect-video overflow-hidden rounded-lg">
							<img
								src={article.imageUrl}
								alt={article.title}
								className="h-full w-full object-cover"
							/>
						</div>
					)}

					{/* Article Content */}
					<article className="prose prose-lg dark:prose-invert max-w-none">
						<div
							dangerouslySetInnerHTML={{
								__html: article.content
									.replace(/\n/g, '<br />')
									.replace(/# /g, '<h1>')
									.replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4 mt-8">')
									.replace(/## /g, '<h2>')
									.replace(/<h2>/g, '<h2 class="text-2xl font-semibold mb-3 mt-6">')
									.replace(
										/```(\w+)/g,
										'<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code class="language-$1">',
									)
									.replace(/```/g, '</code></pre>')
									.replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>'),
							}}
						/>
					</article>

					{/* Comments Section */}
					<Card className="shadow-soft mt-12">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MessageCircle className="h-5 w-5" />
								Comments
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="py-8 text-center">
								<MessageCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
								<h3 className="mb-2 text-lg font-semibold">Comments coming soon</h3>
								<p className="text-muted-foreground">
									I'm working on implementing a comment system for articles. In the meantime, feel free to reach out on{' '}
									<a
										href="https://twitter.com/estevanpithan"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										Twitter
									</a>{' '}
									to share your thoughts!
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</Section>
		</div>
	)
}
