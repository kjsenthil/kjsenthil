import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { calculateAgeToday } from '../../../utils/date';
import { TARGET_RETIREMENT_AGE } from '../constants';
import { ProjectionsChartMetadata } from '../types';

export default function useProjectionsMetadataForProjectionsChart():
  | ProjectionsChartMetadata
  | undefined {
  const { data: client } = useSelector((state: RootState) => state.client);

  if (!client) {
    return undefined;
  }

  const { dateOfBirth } = client.attributes;

  const age = calculateAgeToday(new Date(dateOfBirth));
  const yearsUntilRetirement = TARGET_RETIREMENT_AGE - age;

  const investmentPeriod = yearsUntilRetirement > 0 ? yearsUntilRetirement : 50;

  return { investmentPeriod, todayAge: age };
}
