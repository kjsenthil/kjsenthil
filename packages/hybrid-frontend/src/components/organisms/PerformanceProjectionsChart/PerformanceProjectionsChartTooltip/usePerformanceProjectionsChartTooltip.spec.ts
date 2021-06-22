// eslint-disable-next-line import/no-extraneous-dependencies
import { act, renderHook } from '@testing-library/react-hooks';
import * as visxEvent from '@visx/event';
import usePerformanceProjectionsChartTooltip from './usePerformanceProjectionsChartTooltip';
import {
  contributionsAccessor,
  dateAccessor,
  valueTargetAccessor,
  valueAccessor,
} from '../performanceProjectionsData';
import { getDatumAtPosX } from '../../../../utils/chart';
import { generateParametersForUseTooltipHook } from './PerformanceProjectionsChartTooltipTestUtils';
import { ProjectionsChartProjectionDatum } from '../../../../services/projections';

jest.mock('@visx/event');

describe('usePerformanceProjectionsChartTooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("The hook doesn't call showTooltip() when there is no data", () => {
    const { chartDimension, data, xScale, yScale } = generateParametersForUseTooltipHook(0);

    const { result } = renderHook(() =>
      usePerformanceProjectionsChartTooltip({
        chartDimension,
        projectionsData: data,
        xScale,
        yScale,
        contributionAccessor: contributionsAccessor,
        performanceAccessor: valueAccessor,
        projectionTargetAccessor: valueTargetAccessor,
        dateAccessor,
      })
    );

    const showTooltipSpy = jest.spyOn(result.current.tooltip, 'showTooltip');

    act(() => {
      // We just need to pass an event to our show tooltip handler, hence the
      // ts-ignore. All event properties are mocked via our @visx/event module
      // mock.
      // @ts-ignore
      result.current.handleShowContributionsTooltip(new Event('hover'));
    });

    expect(showTooltipSpy).not.toHaveBeenCalled();
  });

  test('The hook calls showTooltip() correctly when there is data', () => {
    const mockMousePos = {
      x: 100,
      y: 100,
    };

    (visxEvent.localPoint as jest.Mock).mockImplementation(() => mockMousePos);

    const { chartDimension, data, xScale, yScale } = generateParametersForUseTooltipHook(10);

    const { result } = renderHook(() =>
      usePerformanceProjectionsChartTooltip({
        chartDimension,
        projectionsData: data,
        xScale,
        yScale,
        contributionAccessor: contributionsAccessor,
        performanceAccessor: valueAccessor,
        projectionTargetAccessor: valueTargetAccessor,
        dateAccessor,
      })
    );

    const showTooltipSpy = jest.spyOn(result.current.tooltip, 'showTooltip');

    act(() => {
      // We just need to pass an event to our show tooltip handler, hence the
      // ts-ignore. All event properties are mocked via our @visx/event module
      // mock.
      // @ts-ignore
      result.current.handleShowContributionsTooltip(new Event('hover'));
    });

    const datum = getDatumAtPosX<ProjectionsChartProjectionDatum>({
      data,
      xScale,
      dateAccessor,
      posX: mockMousePos.x - chartDimension.margin.left,
    });

    expect(showTooltipSpy).toHaveBeenCalledTimes(1);
    expect(showTooltipSpy).toHaveBeenCalledWith({
      tooltipLeft: mockMousePos.x - chartDimension.margin.left,
      tooltipTop: yScale(valueAccessor(datum)),
      tooltipData: {
        performanceProjection: datum,
        performanceIndicatorPosY: yScale(valueAccessor(datum)),
        contributionIndicatorPosY: yScale(contributionsAccessor(datum)),
        goalNotMetIndicatorPosY: undefined,
      },
    });
  });
});
