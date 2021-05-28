export interface ChildImage {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
}

export interface SummaryValuesProps {
  totalValue: number;
  totalContributions: number;

  totalReturn: number;
  totalReturnPct: number;

  threeMonthsReturn?: number;
  threeMonthsReturnPct?: number;
}
