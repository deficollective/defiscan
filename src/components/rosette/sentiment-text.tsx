import { type Sentiment } from './types';

import { cn } from './helper/cn';
import { sentimentToTextColor } from './helper/sentiment';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip/tooltip';

interface Props {
  sentiment: Sentiment;
  children: string;
  className?: string;
  description?: string;
  vibrant?: boolean;
}

export function SentimentText(props: Props) {
  if (props.description) {
    return (
      <Tooltip>
        <TooltipTrigger className={props.className}>
          <SentimentText sentiment={props.sentiment} vibrant={props.vibrant}>
            {props.children}
          </SentimentText>
        </TooltipTrigger>
        <TooltipContent>{props.description}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <span
      className={cn(
        'font-medium',
        sentimentToTextColor(props.sentiment, { vibrant: props.vibrant }),
        props.className
      )}
    >
      {props.children}
    </span>
  );
}
