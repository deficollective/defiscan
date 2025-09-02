import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MDXContent } from "@/components/mdx-component";
import { getSocialIcon } from "./social-icons";

interface AuthorProfileProps {
  author: {
    title: string;
    slug: string;
    slugAsParams: string;
    email: string;
    image: string;
    description: string;
    social?: Array<{
      name: string;
      icon: string;
      link: string;
    }>;
    body: string;
  };
}

export default function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={author.image} alt={author.title} />
            <AvatarFallback className="text-2xl">
              {author.title
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-3xl">{author.title}</CardTitle>
        <CardDescription className="text-lg">{author.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {author.social && author.social.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {author.social.map((social) => (
              <Link
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary/80"
              >
                {getSocialIcon(social.icon)}
                <span className="capitalize">{social.name}</span>
              </Link>
            ))}
          </div>
        )}
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent code={author.body} />
        </div>
      </CardContent>
    </Card>
  );
}