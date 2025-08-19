import { defineCollection, defineConfig, s } from "velite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Reasons } from "./src/lib/types";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

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
  }).transform((data, context) => {
    // Extract folder name from the file path
    const filePath = context.meta.path;
    const folderName = filePath.split('/').slice(-2, -1)[0]; // Get folder name from path like "protocols/uniswap-v3/data.json"
    
    // Check if id matches folder name
    if (data.id !== folderName) {
      throw new Error(`Protocol ID "${data.id}" does not match folder name "${folderName}" in ${filePath}`);
    }
    
    return data;
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
      stage_requirements: s.tuple([
        s.array(s.string().or(s.object({
          text: s.string(),
          status: s.literal("fixed").or(s.literal("unfixed"))
        }))),
        s.array(s.string().or(s.object({
          text: s.string(),
          status: s.literal("fixed").or(s.literal("unfixed"))
        }))),
        s.array(s.string().or(s.object({
          text: s.string(),
          status: s.literal("fixed").or(s.literal("unfixed"))
        })))
      ]).optional(),
      author: s.array(s.string()),
      submission_date: s.isodate(),
      publish_date: s.isodate(),
      update_date: s.isodate(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const authors = defineCollection({
  name: "authors",
  pattern: "authors/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      email: s.string().email(),
      image: s.string(),
      description: s.string().max(999),
      teamMember: s.boolean().default(true),
      social: s.array(s.object({
        name: s.string(),
        icon: s.string(),
        link: s.string().url()
      })).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const posts = defineCollection({
  name: "posts",
  pattern: "blog/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      authors: s.array(s.string()),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
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
  collections: { protocols, reviews, authors, posts },
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
