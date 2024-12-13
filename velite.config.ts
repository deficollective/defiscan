import { defineCollection, defineConfig, s } from "velite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const protocols = defineCollection({
  name: "Protocols",
  pattern: "protocols/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      protocol: s.string().max(99),
      website: s.string(),
      x: s.string(),
      github: s.string(),
      defillama_slug: s.array(s.string()),
      chain: s.string(),
      stage: s.number().gte(0).lte(2).or(s.literal("R")),
      risks: s.tuple([
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
        s.literal("L").or(s.literal("M")).or(s.literal("H")),
      ]),
      author: s.array(s.string()),
      submission_date: s.isodate(),
      publish_date: s.isodate(),
      acknowledge_date: s.isodate(),
      update_date: s.isodate(),
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
  collections: { protocols },
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
