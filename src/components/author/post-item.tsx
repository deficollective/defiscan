import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthorLink } from "@/components/author";

interface PostItemProps {
  post: {
    title: string;
    slug: string;
    slugAsParams: string;
    description: string;
    date: string;
    authors: string[];
    tags?: string[];
  };
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl">
            <Link href={`/blog/${post.slugAsParams}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
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
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}