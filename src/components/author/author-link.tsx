import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { authors } from "#site/content";

interface AuthorLinkProps {
  authorName: string;
  showAvatar?: boolean;
  className?: string;
}

export default function AuthorLink({ authorName, showAvatar = false, className = "" }: AuthorLinkProps) {
  // First try to find by slugAsParams (which matches the author ID used in blog posts)
  let author = authors.find(a => a.slugAsParams === authorName);
  
  // If not found, try to find by title (for backward compatibility)
  if (!author) {
    author = authors.find(a => a.title === authorName);
  }
  
  if (!author) {
    return <span className={className}>{authorName}</span>;
  }

  return (
    <Link 
      href={`/about/${author.slugAsParams}`}
      className={`hover:underline inline-flex items-center gap-1${className}`}
    >
      {showAvatar && (
        <Avatar className="w-6 h-6">
          <AvatarImage src={author.image} alt={author.title} />
          <AvatarFallback className="text-xs">
            {author.title
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      <span>{author.title}</span>
    </Link>
  );
}