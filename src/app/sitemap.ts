import { MetadataRoute } from "next";
import { loadReviews } from "@/lib/data/utils";
import { authors, posts } from "#site/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://defiscan.info";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit-review`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/framework`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Dynamic protocol pages
  try {
    const reviews = await loadReviews();

    const protocolPages: MetadataRoute.Sitemap = reviews.flatMap((project) => {
      return project.reviews.map((review) => ({
        url: `${baseUrl}/protocols/${project.protocol}/${review.chain}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    });

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = posts
      .filter((post) => post.published)
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slugAsParams}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    // Author pages
    const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
      url: `${baseUrl}/about/${author.slugAsParams}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...protocolPages, ...blogPages, ...authorPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [...staticPages, ...blogPages];
  }
}
