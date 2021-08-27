import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClient, IsaContribution } from '../../services/myAccount';
import { fetchIsaContribution } from '../../services/myAccount/thunks';
import { RootState } from '../../store';
import useStateIsAvailable from '../useStateIsAvailable';
import useStateIsLoading from '../useStateIsLoading';

export interface IsaContributionProps {
  isaContribution?: IsaContribution;
}
const useIsaContribution = (
  { shouldDispatch }: { shouldDispatch: boolean } = { shouldDispatch: true }
): IsaContributionProps => {
  const { isaContribution } = useSelector((state: RootState) => ({
    isaContribution: state.isaContribution.data,
  }));

  const isIsaContributionLoading = useStateIsLoading('isaContribution');
  const isClientAvailable = useStateIsAvailable('client');
  const isIsaContributionAvailable = useStateIsAvailable('isaContribution');

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch && !isClientAvailable) {
      dispatch(fetchClient());
    }
  }, [shouldDispatch, isClientAvailable]);

  useEffect(() => {
    if (
      shouldDispatch &&
      isClientAvailable &&
      !isIsaContributionAvailable &&
      !isIsaContributionLoading
    ) {
      dispatch(fetchIsaContribution());
    }
  }, [isClientAvailable, isIsaContributionLoading, isIsaContributionAvailable]);

  return {
    isaContribution,
  };
};

export default useIsaContribution;
