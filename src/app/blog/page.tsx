import { Suspense } from "react";
import BlogClient from "./blog-client";

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Latest insights and analysis from the DeFiScan team
        </p>
      </div>
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>}>
      <BlogClient />
    </Suspense>
  );
}