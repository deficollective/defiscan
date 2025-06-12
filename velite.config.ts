import { defineCollection, defineConfig, s } from "velite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Reasons } from "./src/lib/types";
import { readFileSync } from "fs";
import { join } from "path";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

// Function to extract conclusion from markdown content
const extractConclusionFromMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Split content into lines
  const lines = content.split('\n');
  let conclusionStart = -1;
  let conclusionEnd = -1;
  
  // Find the start of the conclusion section
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '## Conclusion') {
      conclusionStart = i + 1;
      break;
    }
  }
  
  if (conclusionStart === -1) return '';
  
  // Find the end of the conclusion section (next # heading)
  for (let i = conclusionStart; i < lines.length; i++) {
    if (lines[i].trim().startsWith('# ') && !lines[i].includes('Conclusion')) {
      conclusionEnd = i;
      break;
    }
  }
  
  // If no next section found, use end of file
  if (conclusionEnd === -1) conclusionEnd = lines.length;
  
  // Extract and clean the conclusion text
  const conclusionLines = lines.slice(conclusionStart, conclusionEnd);
  return conclusionLines
    .join('\n')
    .trim()
    // Remove the "Overall score:" quote block
    .replace(/>\s*Overall score:.*$/gm, '')
    .replace(/>\s*Overall Score:.*$/gm, '')
    .trim();
};

// Define valid reasons
const ReasonSchema = s
  .literal("Central Custody")
  .or(s.literal("Missing Docs"))
  .or(s.literal("Closed-Source"))
  .or(s.literal("Unverified Contracts"))
  .or(s.literal("Incorrect Docs"));

const ReasonSetSchema = s
  .array(ReasonSchema)
  .transform((reasons) => Array.from(new Set(reasons))); // Remove duplicates



const protocols = defineCollection({
  name: "protocols",
  pattern: "protocols/**/data.json",
  schema: s.object({
    id: s.string(),
    slug: s.path(),
    protocol: s.string().max(99),
    website: s.string().url(),
    defillama_slug: s.array(s.string()),
    socials: s.object({
      x: s.string()
    }),
    github: s.array(s.string().url())
  })
})



const reviews = defineCollection({
  name: "reviews",
  pattern: "protocols/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      chain: s.string(),
      instance: s.string().optional(),
      type: s.string().optional(),
      logo: s.string().optional(),
      protocols: s.array(s.string()).optional(),
      stage: s
        .number()
        .gte(0)
        .lte(2)
        .or(s.literal("R"))
        .or(s.literal("O"))
        .or(s.literal("I0"))
        .or(s.literal("I1"))
        .or(s.literal("I2")),
      risks: s.tuple([
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
      ]),
      reasons: ReasonSetSchema,
      author: s.array(s.string()),
      submission_date: s.isodate(),
      publish_date: s.isodate(),
      update_date: s.isodate(),
      body: s.mdx(),
    })
    .transform((data) => {
      // Read the raw file content directly using the slug
      let rawContent = '';
      try {
        // Convert slug to file path (slug is like "protocols/aave/ethereum")
        const filePath = join(process.cwd(), 'src/content', `${data.slug}.md`);
        rawContent = readFileSync(filePath, 'utf-8');
      } catch (error) {
        // Silently handle file reading errors
      }
      
      return {
        ...computedFields(data),
        conclusion: extractConclusionFromMarkdown(rawContent),
      };
    }),
});

export default defineConfig({
  root: "./src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[text]",
    clean: true,
  },
  collections: { protocols, reviews },
  mdx: {
    rehypePlugins: [
      rehypeSlug as any,
      [rehypePrettyCode, { theme: "dracula" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
