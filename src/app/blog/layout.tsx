import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest insights and analysis from the DeFiScan team",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}