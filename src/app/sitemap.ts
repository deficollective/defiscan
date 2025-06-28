import { MetadataRoute } from 'next'
import { loadReviews } from '@/lib/data/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://defiscan.info'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit-review`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic protocol pages
  try {
    const reviews = await loadReviews()
    
    const protocolPages: MetadataRoute.Sitemap = reviews.flatMap((project) => {
      return project.reviews.map((review) => ({
        url: `${baseUrl}/protocols/${project.protocol}/${review.chain}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    })

    return [...staticPages, ...protocolPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}