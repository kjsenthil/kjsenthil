// eslint-disable-next-line import/no-extraneous-dependencies
import { act, renderHook } from '@testing-library/react-hooks';
import * as visxEvent from '@visx/event';
import usePerformanceChartTooltip from './usePerformanceChartTooltip';
import { ContributionDatum, PerformanceDatum } from '../performanceData';
import { generateParametersForUseTooltipHook } from './PerformanceChartTooltipTestUtils';
import {
  getDatumAtPosX,
  timeSeriesDateAccessor,
  timeSeriesValueAccessor,
} from '../../../../utils/chart';

jest.mock('@visx/event');

describe('usePerformanceChartTooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("The hook doesn't call showTooltip() when there is no data", () => {
    const {
      contributionsData,
      performanceData,
      xScale,
      yScale,
    } = generateParametersForUseTooltipHook(0);

    const { result } = renderHook(() =>
      usePerformanceChartTooltip({
        performanceData,
        contributionsData,
        xScale,
        yScale,
        yAccessor: timeSeriesValueAccessor,
        xAccessor: timeSeriesDateAccessor,
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
      x: 60,
      y: 100,
    };

    (visxEvent.localPoint as jest.Mock).mockImplementation(() => mockMousePos);

    const {
      contributionsData,
      performanceData,
      xScale,
      yScale,
    } = generateParametersForUseTooltipHook(10);

    const { result } = renderHook(() =>
      usePerformanceChartTooltip({
        performanceData,
        contributionsData,
        xScale,
        yScale,
        yAccessor: timeSeriesValueAccessor,
        xAccessor: timeSeriesDateAccessor,
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

    const performanceDatum = getDatumAtPosX<PerformanceDatum>({
      data: performanceData,
      xScale,
      dateAccessor: timeSeriesDateAccessor,
      posX: mockMousePos.x,
    });
    const contributionDatum = getDatumAtPosX<ContributionDatum>({
      data: performanceData,
      xScale,
      dateAccessor: timeSeriesDateAccessor,
      posX: mockMousePos.x,
    });

    expect(showTooltipSpy).toHaveBeenCalledTimes(1);
    expect(showTooltipSpy).toHaveBeenCalledWith({
      tooltipLeft: mockMousePos.x,
      tooltipTop: yScale(timeSeriesValueAccessor(performanceDatum)),
      tooltipData: {
        performance: performanceDatum,
        contribution: contributionDatum,
        performanceIndicatorPosY: yScale(timeSeriesValueAccessor(performanceDatum)),
        contributionIndicatorPosY: yScale(timeSeriesValueAccessor(contributionDatum)),
      },
    });
  });
});
