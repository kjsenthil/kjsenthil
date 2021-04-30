import { useTheme } from '../../../atoms';

export interface ChartDimension {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

export enum ScreenSize {
  DESKTOP_HD = 'DESKTOP_HD',
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

const defaultChartDimension: ChartDimension = {
  width: 0,
  height: 0,
  margin: {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30,
  },
};

const CHART_DIMENSION: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.DESKTOP_HD]: {
    ...defaultChartDimension,
    height: 290,
  },
  [ScreenSize.DESKTOP]: {
    ...defaultChartDimension,
    height: 290,
  },
  [ScreenSize.TABLET]: {
    ...defaultChartDimension,
    height: 290,
  },
  [ScreenSize.MOBILE]: {
    ...defaultChartDimension,
    height: 290,
  },
};

export function usePerformanceChartStyles() {
  const {
    palette: { primary, tertiary, common, grey },
  } = useTheme();

  return {
    DIMENSION: CHART_DIMENSION,

    GRADIENT: {
      PERFORMANCE_GRAPH: {
        from: primary.light2,
        to: common.white,
        toOffset: '90%',
        toOpacity: 0.25,
      },
      CONTRIBUTIONS_GRAPH: {
        from: tertiary.light2,
        to: common.white,
        toOffset: '90%',
        toOpacity: 0.25,
      },
    },

    TEXT_SIZE: {
      AXES: 12,
    },

    TEXT_COLOR: {
      AXES: grey['300'],
    },

    STROKE_COLOR: {
      GRID: grey['200'],
      INDICATOR: grey['400'],
      PERFORMANCE_GRAPH: primary.main,
      CONTRIBUTION_GRAPH: grey['300'],
    },

    STROKE_OPACITY: {
      GRID: 0.8,
    },

    STROKE_DASHARRAY: {
      GRID: '2 2',
      CONTRIBUTION_GRAPH: '5 5',
    },

    STROKE_WIDTH: {
      GRID: 2,
      INDICATOR_CIRCLE: 1,
      INDICATOR_LINE: 2,
      PERFORMANCE_GRAPH: 4,
      CONTRIBUTION_GRAPH: 2,
    },

    FILL: {
      INDICATOR: common.white,
    },

    RADIUS: {
      INDICATOR: 5,
    },
  };
}
