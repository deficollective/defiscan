"use client";

import { Metadata } from "next";
import { protocols as allProtocols } from "#site/content";
import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx-component";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BigPizzaRosette } from "@/components/rosette/big-rosette";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { TooltipProvider } from "@/components/rosette/tooltip/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";

interface ProtocolPageItemProps {
  params: {
    slug: string[];
  };
}

async function getProtocolFromParams(slug: string[]) {
  const slugString = slug.join("/");
  const protocol = allProtocols.find(
    (protocol) => protocol.slugAsParams === slugString
  );

  return { ...protocol };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] };
// }): Promise<Metadata> {
//   const protocol = await getProtocolFromParams(params.slug);

//   if (!protocol) {
//     return {
//       title: "Protocol not found",
//       description: "Protocol details could not be found.",
//     };
//   }

//   return {
//     title: protocol.protocol,
//     description: "DeFi Scan decentralization report for " + protocol.protocol,
//     authors: {
//       name: protocol.author!.join(", "),
//     },
//   };
// }

export default async function ProtocolPageItem({
  params,
}: ProtocolPageItemProps) {
  const protocol = await getProtocolFromParams(params.slug);

  if (!protocol) {
    return <div>Protocol not found</div>; // Handle not found case
  }

  return (
    <article className="container relative mx-auto py-6 lg:py-10">
      <div>
        <h1 className="mt-2 mb-8 inline-block text-2xl md:text-4xl font-bold capitalize leading-tight text-primary lg:text-5xl">
          {protocol.protocol}
        </h1>

        <table className="table-auto border-separate border-spacing-y-2 border-spacing-x-4 -ml-4">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">Website</td>
              <td className="break-all max-w-xs">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={protocol.website}
                  className="text-blue-500 hover:underline text-sm md:text-base"
                >
                  {protocol.website}
                </a>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">X (Twitter)</td>
              <td className="break-all max-w-xs">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={protocol.x}
                  className="text-blue-500 hover:underline text-sm md:text-base"
                >
                  {protocol.x}
                </a>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">GitHub</td>
              <td className="break-all max-w-xs">
                <div>
                  {protocol.github!.map((slug, index) => (
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`
                          ${slug}`}
                      className="text-blue-500 hover:underline text-sm md:text-base"
                    >
                      {index == 0 ? slug : ", " + slug}
                    </a>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Defillama</td>
              <td className="break-all max-w-xs">
                <div className="">
                  {protocol.defillama_slug!.map((slug, index) => (
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`
                        https://defillama.com/protocol/${slug}`}
                      className="text-blue-500 hover:underline text-sm md:text-base"
                    >
                      {index == 0 ? slug : ", " + slug}
                    </a>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">Chain</td>
              <td className="break-all max-w-xs">{protocol.chain}</td>
            </tr>
          </tbody>
        </table>

        <h1 className="mt-10 mb-4 scroll-m-20 text-2xl md:text-4xl font-bold text-primary tracking-tight">
          Declaration
        </h1>

        <p>
          This review has been submitted by {protocol.author!.join(", ")} on{" "}
          {protocol.submission_date!.split("T")[0]}.
        </p>
        <p>
          It was reviewed and published by the DeFi Collective team on{" "}
          {protocol.publish_date!.split("T")[0]}.
        </p>
        <p>
          {protocol.update_date!.split("T")[0] === "1970-01-01"
            ? "The review has not been updated since the initial submission"
            : "The last update to the review was made on " +
              protocol.update_date!.split("T")[0]}
          .
        </p>
        <p>
          This content is provided "as is" and "as available". Read more in our
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"../../terms"}
            className="text-blue-500 hover:underline"
          >
            {" "}
            Terms
          </a>
          .
        </p>

        {protocol.stage! != "O" ? (
          <h1 className="mt-10 mb-4 scroll-m-20 text-2xl md:text-4xl font-bold text-primary tracking-tight">
            Stage
          </h1>
        ) : (
          <></>
        )}

        {protocol.stage! != "O" ? (
          <TooltipProvider>
            <Badge
              title={"Stage of Decentralisation"}
              stage={protocol.stage! as Stage}
              className={`${
                protocol.stage! === "R"
                  ? "bg-gray-500"
                  : protocol.stage! === 0
                    ? "bg-red-500"
                    : protocol.stage! === 1
                      ? "bg-yellow-500"
                      : "bg-green-500"
              } text-white py-1 rounded "text-lg"`}
            >
              {protocol.stage! === "R" ? "Review" : "Stage " + protocol.stage!}
            </Badge>
          </TooltipProvider>
        ) : (
          <></>
        )}

        {protocol.stage! === "O" ? (
          <h1 className="mt-10 mb-4 scroll-m-20 text-2xl md:text-4xl font-bold text-primary tracking-tight">
            Missing Requirements for Stage 0
          </h1>
        ) : (
          <></>
        )}
        {
          <div>
            {protocol.stage! === "O" ? (
              protocol.reasons!.map((el) => (
                <TooltipProvider>
                  <Badge
                    title={"Reason"}
                    className="my-1 bg-red-500"
                    stage={"O"}
                    reason={el}
                  >
                    {el}
                  </Badge>
                </TooltipProvider>
              ))
            ) : (
              <></>
            )}
          </div>
        }

        <h1 className="mt-10 mb-4 scroll-m-20 text-2xl md:text-4xl font-bold text-primary tracking-tight">
          Risks
        </h1>

        <TooltipProvider>
          <BigPizzaRosette
            className="mt-auto"
            values={getRiskDescriptions(protocol.risks!)}
          />
        </TooltipProvider>
        <Mdx code={protocol.body!} />
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 size-4" />
            See all Protocols
          </Link>
        </div>
      </div>
    </article>
  );
}
