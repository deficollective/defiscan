import { notFound } from "next/navigation";
import { Suspense } from "react";
import { authors, posts } from "#site/content";
import { AuthorProfile, PostItem } from "@/components/author";

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

async function getAuthorFromParams(params: AuthorPageProps["params"]) {
  const author = authors.find((author) => author.slugAsParams === params.slug);
  
  if (!author) {
    return null;
  }

  return author;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorFromParams(params);

  if (!author) {
    notFound();
  }

  // Get posts by this author (check both slug and title for compatibility)
  const authorPosts = posts.filter((post) => 
    post.authors.includes(author.slugAsParams) || post.authors.includes(author.title)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <Suspense fallback={<div className="animate-pulse bg-muted h-48 rounded-lg" />}>
        <AuthorProfile author={author} />
      </Suspense>
      
      {authorPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Posts by {author.title}</h2>
          <div className="grid gap-4">
            {authorPosts.map((post) => (
              <Suspense key={post.slug} fallback={<div className="animate-pulse bg-muted h-24 rounded-lg" />}>
                <PostItem post={post} />
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const author = await getAuthorFromParams(params);

  if (!author) {
    return {};
  }

  return {
    title: `${author.title} - DeFiScan Team`,
    description: author.description,
  };
}

export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slugAsParams,
  }));
}