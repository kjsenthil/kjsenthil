import { ProjectionsChartMetadata } from '@tsw/react-components';
import { TARGET_RETIREMENT_AGE } from '../../services/projections';
import useBasicInfo from '../useBasicInfo';

export default function useProjectionsMetadataForProjectionsChart(): ProjectionsChartMetadata {
  const { clientAge: todayAge } = useBasicInfo({ shouldDispatch: false });

  const yearsUntilRetirement = TARGET_RETIREMENT_AGE - todayAge;

  const investmentPeriod = yearsUntilRetirement > 0 ? yearsUntilRetirement : 50;

  return { investmentPeriod, todayAge };
}
