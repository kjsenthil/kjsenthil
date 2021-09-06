import { useTheme } from '../../components/atoms';

/**
 * This hook returns a styles object for our chart.
 */
export default function useChartStyles() {
  const {
    palette: { primary, secondary, tertiary, common, grey, gold },
    typography: { fontFamily },
  } = useTheme();

  return {
    GRADIENT: {
      PERFORMANCE_GRAPH: {
        from: primary.light2,
        to: common.white,
        toOffset: '90%',
        toOpacity: 0.25,
      },
      PROJECTIONS_GRAPH: {
        from: tertiary.light2,
        to: tertiary.light2,
        toOffset: '90%',
        toOpacity: 0,
      },
    },

    TEXT_SIZE: {
      AXES: 12,
    },

    TEXT_COLOR: {
      AXES: grey['300'],
    },

    TEXT_FONT: {
      COMMON: fontFamily,
    },

    STROKE_COLOR: {
      OUTER_BORDER: grey['200'],
      GRID: grey['200'],

      INDICATOR: grey['300'],
      DOT_INDICATOR_OUTER: 'transparent',
      DOT_INDICATOR_INNER: 'transparent',

      PERFORMANCE_GRAPH: primary.main,
      CONTRIBUTION_GRAPH: secondary.dark1 ?? secondary.main,
      PROJECTIONS_GRAPH: tertiary.main,
      GOAL_NOT_MET_GRAPH: gold.main,
    },

    STROKE_OPACITY: {
      OUTER_BORDER: 0.8,
      GRID: 0.8,
    },

    STROKE_DASHARRAY: {
      GRID: '2 2',
      CONTRIBUTION_GRAPH: '5 5',
      GOAL_NOT_MET_GRAPH: '5 5',
    },

    STROKE_WIDTH: {
      OUTER_BORDER: 2,
      GRID: 1,

      INDICATOR_CIRCLE: 1,
      INDICATOR_LINE: 2,
      DOT_INDICATOR_INNER: 0,
      DOT_INDICATOR_OUTER: 0,

      PERFORMANCE_GRAPH: 4,
      CONTRIBUTION_GRAPH: 2,
      PROJECTIONS_GRAPH: 4,
      GOAL_NOT_MET_GRAPH: 2,
    },

    FILL: {
      BACKGROUND: common.white,
      AXIS_TICK_AREA: '#f8f8fe', // This is the background color for the x-axis and y-axis tick areas
      INDICATOR: common.white,
      DOT_INDICATOR_OUTER: common.white,
      PROJECTIONS_VARIANCE_BAND_GRAPH: tertiary.light1,
    },

    FILL_OPACITY: {
      PROJECTIONS_VARIANCE_BAND_GRAPH: 0.5,
    },

    RADIUS: {
      INDICATOR: 5,

      DOT_INDICATOR_OUTER: 10,
      DOT_INDICATOR_INNER: 3,
    },

    WIDTH: {
      // This is the width of the likely range band's mask. It restricts the
      // display of the likely range to an area of this width only. Effect only
      // shows up on hover and when likely range is toggled to not always show.
      PROJECTIONS_LIKELY_RANGE_BAND_MASK: 100,
    },
  };
}
