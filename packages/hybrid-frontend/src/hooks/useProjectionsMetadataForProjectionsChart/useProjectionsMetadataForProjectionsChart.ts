import { ProjectionsChartMetadata } from '../../services/projections/types';
import { TARGET_RETIREMENT_AGE } from '../../services/projections/constants';
import useBasicInfo from '../useBasicInfo';

export default function useProjectionsMetadataForProjectionsChart(): ProjectionsChartMetadata {
  const basicInfo = useBasicInfo();

  const yearsUntilRetirement = TARGET_RETIREMENT_AGE - basicInfo.clientAge;

  const investmentPeriod = yearsUntilRetirement > 0 ? yearsUntilRetirement : 50;

  return { investmentPeriod, todayAge: basicInfo.clientAge };
}
