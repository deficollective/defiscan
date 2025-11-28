import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "#site/content";
import { Mdx } from "@/components/mdx-component";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { AuthorLink } from "@/components/author";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(params: BlogPostPageProps["params"]) {
  const post = posts.find((post) => post.slugAsParams === params.slug);
  return post || null;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<
  BlogPostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">{post.title}</h1>
          <p className="text-muted-foreground">{post.description}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>By</span>
            <div className="flex items-center gap-1">
              {post.authors.map((author, index) => (
                <span key={author} className="flex items-center gap-1">
                  <AuthorLink authorName={author} showAvatar />
                  {index < post.authors.length - 1 && <span>, </span>}
                </span>
              ))}
            </div>
          </div>
          <div>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <hr />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Mdx code={post.body} />
      </div>
    </div>
  );
}