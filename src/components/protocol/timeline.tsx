import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const ReviewTimeline = ({
  protocol,
  className,
}: {
  protocol: any;
  className: string;
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>Review Timeline</CardHeader>
      <CardContent>
        <div className="flex flex-col justify-end">
          <ul className="font-mono text-xs list-disc list-inside pb-4">
            <li>
              This review has been submitted by {protocol.author!.join(", ")} on{" "}
              {protocol.submission_date!.split("T")[0]}.
            </li>
            <li>
              It was reviewed and published by the DeFi Collective team on{" "}
              {protocol.publish_date!.split("T")[0]}.
            </li>
            <li>
              {protocol.update_date!.split("T")[0] === "1970-01-01"
                ? "The review has not been updated since the initial submission"
                : "The last update to the review was made on " +
                  protocol.update_date!.split("T")[0]}
              .
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
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
      </CardFooter>
    </Card>
  );
};
