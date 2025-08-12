export interface RosetteValue {
  name: string;
  value?: string;
  sentiment: Sentiment;
  description?: string;
  warning?: WarningValueWithSentiment;
}

export type Sentiment = 'low' | 'medium' | 'high' | 'neutral' | 'UnderReview';

export type ValueWithSentiment<T, S extends string = Sentiment> = {
  sentiment: S;
  description?: string;
} & (T extends unknown[]
  ? {
      values: T;
    }
  : {
      value: T;
    });

type WarningSentiment = 'low' | 'medium' | 'neutral';
export type WarningValueWithSentiment = ValueWithSentiment<string, WarningSentiment>;
