import { Suspense } from "react";
import { authors } from "#site/content";
import { AuthorCard } from "@/components/author";

export default function AuthorsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">Authors</h1>
        <p className="text-muted-foreground">
          Meet the team behind DeFiScan
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <Suspense key={author.slug} fallback={<div className="animate-pulse bg-muted h-32 rounded-lg" />}>
            <AuthorCard author={author} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Authors - DeFiScan",
    description: "Meet the team behind DeFiScan",
  };
}