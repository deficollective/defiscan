"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { posts } from "#site/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthorLink } from "@/components/author";

export default function BlogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const tagsFromUrl = searchParams.get("tags");
    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split(","));
    }
  }, [searchParams]);

  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    publishedPosts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return publishedPosts;
    return publishedPosts.filter((post) =>
      selectedTags.every((tag) => post.tags?.includes(tag))
    );
  }, [publishedPosts, selectedTags]);

  const updateUrl = (tags: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (tags.length > 0) {
      params.set("tags", tags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    updateUrl(newTags);
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    updateUrl([]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Latest insights and analysis from the DeFiScan team
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Filter by Tags</h2>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const postCount = publishedPosts.filter((post) =>
                post.tags?.includes(tag)
              ).length;

              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ({postCount})
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow flex flex-col">
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
            <CardContent className="flex-1 flex flex-col justify-end space-y-3">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs cursor-pointer hover:bg-secondary/80"
                      onClick={() => toggleTag(tag)}
                    >
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
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {selectedTags.length > 0 
              ? "No blog posts found matching the selected tags." 
              : "No blog posts found."}
          </p>
        </div>
      )}
    </div>
  );
}