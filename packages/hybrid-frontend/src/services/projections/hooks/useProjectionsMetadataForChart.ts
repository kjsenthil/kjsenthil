import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { calculateAgeToday } from '../../../utils/date';
import { TARGET_RETIREMENT_AGE } from '../constants';
import { ProjectionsChartMetadata } from '../types';

export default function useProjectionsMetadataForChart(): ProjectionsChartMetadata | undefined {
  const { client } = useSelector((state: RootState) => state.myAccount);

  if (!client) {
    return undefined;
  }

  const { dateOfBirth } = client.data.attributes;

  const age = calculateAgeToday(new Date(dateOfBirth));
  const yearsUntilRetirement = TARGET_RETIREMENT_AGE - age;

  const investmentPeriod = yearsUntilRetirement > 0 ? yearsUntilRetirement : 50;

  return { goalMet: true, investmentPeriod, todayAge: age };
}
