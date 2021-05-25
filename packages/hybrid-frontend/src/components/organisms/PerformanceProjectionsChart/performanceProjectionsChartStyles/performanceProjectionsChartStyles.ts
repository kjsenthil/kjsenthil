import { useTheme } from '../../../atoms';
import { ChartDimension, ScreenSize, defaultChartDimension } from '../../../../config/chart';

const defaultPerformanceProjectionsChartDimension: ChartDimension = {
  ...defaultChartDimension,
  height: 360,
  margin: {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30,
  },
};

const simplifiedPerformanceProjectionsChartDimension: ChartDimension = {
  ...defaultChartDimension,
  height: 360,
  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 0,
  },
};

// Note: update the default chart height for each screen size as needed
const DEFAULT_CHART_DIMENSION: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.DESKTOP_HD]: defaultPerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP]: defaultPerformanceProjectionsChartDimension,
  [ScreenSize.TABLET]: defaultPerformanceProjectionsChartDimension,
  [ScreenSize.MOBILE]: defaultPerformanceProjectionsChartDimension,
};

// Note: update the default chart height for each screen size as needed
const SIMPLIFIED_CHART_DIMENSION: Record<ScreenSize, ChartDimension> = {
  [ScreenSize.DESKTOP_HD]: simplifiedPerformanceProjectionsChartDimension,
  [ScreenSize.DESKTOP]: simplifiedPerformanceProjectionsChartDimension,
  [ScreenSize.TABLET]: simplifiedPerformanceProjectionsChartDimension,
  [ScreenSize.MOBILE]: simplifiedPerformanceProjectionsChartDimension,
};

export interface UsePerformanceProjectionsChartStylesProps {
  dimension?: Record<ScreenSize, ChartDimension>;
}

export function usePerformanceProjectionsChartStyles(
  chartType: 'default' | 'simplified' = 'default'
) {
  const {
    palette: { primary, tertiary, common, grey, gold },
    typography: { fontFamily },
  } = useTheme();

  return {
    DIMENSION: chartType === 'simplified' ? SIMPLIFIED_CHART_DIMENSION : DEFAULT_CHART_DIMENSION,

    GRADIENT: {
      HISTORICAL_GRAPH: {
        from: primary.light2,
        to: primary.light2,
        toOffset: '90%',
        toOpacity: 0,
      },
      PROJECTIONS_GRAPH: {
        from: tertiary.light2,
        to: tertiary.light2,
        toOffset: '90%',
        toOpacity: 0,
      },
    },

    TEXT_FONT: {
      COMMON: fontFamily,
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
      HISTORICAL_GRAPH: primary.main,
      PROJECTIONS_GRAPH: tertiary.main,
      CONTRIBUTION_GRAPH: grey['300'],
      GOAL_NOT_MET_GRAPH: gold.main,
    },

    STROKE_OPACITY: {
      GRID: 0.8,
    },

    STROKE_DASHARRAY: {
      GRID: '2 2',
      CONTRIBUTION_GRAPH: '5 5',
      GOAL_NOT_MET_GRAPH: '5 5',
    },

    STROKE_WIDTH: {
      GRID: 2,
      INDICATOR_CIRCLE: 1,
      INDICATOR_LINE: 2,
      HISTORICAL_GRAPH: 4,
      PROJECTIONS_GRAPH: 4,
      CONTRIBUTION_GRAPH: 2,
      GOAL_NOT_MET_GRAPH: 2,
    },

    FILL: {
      INDICATOR: common.white,
      PROJECTIONS_VARIANCE_BAND_GRAPH: tertiary.light1,
    },

    FILL_OPACITY: {
      PROJECTIONS_VARIANCE_BAND_GRAPH: 0.5,
    },

    RADIUS: {
      INDICATOR: 5,
    },
  };
}
