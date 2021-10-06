export interface ChartDimension {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

export interface ChartDimensionWithExtras extends ChartDimension {
  innerWidth: number;
  innerHeight: number;
}

export enum ScreenSize {
  DESKTOP_HD = 'DESKTOP_HD',
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

export const defaultChartDimension: ChartDimension = {
  width: 0,
  height: 0,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export type ChartDimensionByScreenSize = Record<ScreenSize, ChartDimension>;

export type ChartDimensionWithExtrasByScreenSize = Record<ScreenSize, ChartDimensionWithExtras>;

export const defaultChartDimensionByScreenSize: ChartDimensionByScreenSize = {
  [ScreenSize.MOBILE]: defaultChartDimension,
  [ScreenSize.TABLET]: defaultChartDimension,
  [ScreenSize.DESKTOP]: defaultChartDimension,
  [ScreenSize.DESKTOP_HD]: defaultChartDimension,
};
