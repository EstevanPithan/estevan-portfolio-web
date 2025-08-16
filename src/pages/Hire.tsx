import profilePhoto from '@/assets/profile-photo.jpg'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section, SectionHeader } from '@/components/ui/section'
import { Textarea } from '@/components/ui/textarea'
import { Linkedin, Mail, Phone, Copy, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Hire() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		await new Promise((resolve) => setTimeout(resolve, 1000))

		toast('Message sent!', {
			description: "Thank you for reaching out. I'll get back to you soon.",
		})

		setFormData({ name: '', email: '', message: '' })
		setIsSubmitting(false)
	}

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text)
		toast('Copied!', {
			description: `${label} copied to clipboard.`,
		})
	}

	const email = '[EMAIL]'
	const phone = '[PHONE]'
	const linkedinUrl = '[LINKEDIN_URL]'

	return (
		<div className="min-h-screen py-16">
			<Section>
				<SectionHeader
					title="Let's Work Together"
					description="Ready to bring your ideas to life? I'd love to hear about your project"
				/>

				<div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
					{/* Contact Cards */}
					<div className="space-y-6">
						{/* LinkedIn Card */}
						<Card className="shadow-soft transition-smooth hover:shadow-medium">
							<CardHeader>
								<div className="flex items-center gap-4">
									<Avatar className="h-16 w-16">
										<AvatarImage
											src={profilePhoto}
											alt="Estevan Pithan"
										/>
										<AvatarFallback>EP</AvatarFallback>
									</Avatar>
									<div>
										<CardTitle className="flex items-center gap-2">
											<Linkedin className="h-5 w-5 text-blue-600" />
											LinkedIn
										</CardTitle>
										<CardDescription>Connect with me professionally</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									Senior Frontend Engineer with 6+ years of experience building scalable web applications. Passionate
									about React, TypeScript, and creating exceptional user experiences.
								</p>
								<Button
									asChild
									className="w-full"
								>
									<a
										href={linkedinUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="mr-2 h-4 w-4" />
										Open LinkedIn Profile
									</a>
								</Button>
							</CardContent>
						</Card>

						{/* Email Card */}
						<Card className="shadow-soft transition-smooth hover:shadow-medium">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Mail className="h-5 w-5" />
									Email
								</CardTitle>
								<CardDescription>Send me a direct message</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="bg-muted flex items-center justify-between rounded-lg p-3">
									<span className="font-mono text-sm">{email}</span>
									<div className="flex gap-2">
										<Button
											size="icon"
											variant="ghost"
											onClick={() => copyToClipboard(email, 'Email')}
											aria-label="Copy email"
										>
											<Copy className="h-4 w-4" />
										</Button>
										<Button
											size="icon"
											variant="ghost"
											asChild
										>
											<a
												href={`mailto:${email}`}
												aria-label="Send email"
											>
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Phone Card */}
						<Card className="shadow-soft transition-smooth hover:shadow-medium">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Phone className="h-5 w-5" />
									Phone
								</CardTitle>
								<CardDescription>Call for urgent inquiries</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="bg-muted flex items-center justify-between rounded-lg p-3">
									<span className="font-mono text-sm">{phone}</span>
									<div className="flex gap-2">
										<Button
											size="icon"
											variant="ghost"
											onClick={() => copyToClipboard(phone, 'Phone number')}
											aria-label="Copy phone number"
										>
											<Copy className="h-4 w-4" />
										</Button>
										<Button
											size="icon"
											variant="ghost"
											asChild
										>
											<a
												href={`tel:${phone}`}
												aria-label="Call phone number"
											>
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<Card className="shadow-soft">
						<CardHeader>
							<CardTitle>Send me a message</CardTitle>
							<CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleSubmit}
								className="space-y-6"
							>
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										placeholder="Your full name"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										placeholder="your.email@example.com"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										required
										placeholder="Tell me about your project..."
										rows={5}
									/>
								</div>

								<Button
									type="submit"
									className="transition-spring w-full hover:scale-105"
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Sending...' : 'Send Message'}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</Section>
		</div>
	)
}
