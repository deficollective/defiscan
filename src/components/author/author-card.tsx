import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getSocialIcon } from "./social-icons";

interface AuthorCardProps {
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
  };
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={author.image} alt={author.title} />
            <AvatarFallback>
              {author.title
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">
          <Link href={`/about/${author.slugAsParams}`} className="hover:underline">
            {author.title}
          </Link>
        </CardTitle>
        <CardDescription>{author.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        {author.social && author.social.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {author.social.map((social) => (
              <Link
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary/80"
              >
                {getSocialIcon(social.icon)}
                <span className="capitalize">{social.name}</span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}