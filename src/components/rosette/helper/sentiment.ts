import { type Sentiment } from '../types';

export function sentimentToFillColor(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'low':
      return 'fill-green-300 dark:fill-green-450';
    case 'medium':
      return 'fill-yellow-200';
    case 'high':
      return 'fill-orange-600';
    case 'neutral':
    case 'UnderReview':
      return 'fill-gray-400 dark:fill-zinc-700';
  }
}

export function sentimentToBgColor(sentiment: Sentiment): string {
  switch (sentiment) {
    case 'low':
      return 'bg-green-300/15 dark:bg-green-450/15';
    case 'medium':
      return 'bg-yellow-200/15';
    case 'high':
      return 'bg-orange-600/15';
    case 'neutral':
    case 'UnderReview':
      return 'bg-gray-400/15 dark:bg-zinc-700/15';
  }
}

export function sentimentToTextColor(sentiment: Sentiment, opts?: { vibrant?: boolean }): string {
  switch (sentiment) {
    case 'low':
      return 'text-green-700 dark:text-green-450';
    case 'medium':
      return 'text-yellow-700 dark:text-yellow-200';
    case 'high':
      return opts?.vibrant ? 'text-red-550 dark:text-orange-600' : '';
    case 'neutral':
    case 'UnderReview':
      return '';
  }
}
