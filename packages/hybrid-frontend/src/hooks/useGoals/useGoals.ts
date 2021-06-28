import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, CurrentGoalsState, CurrentGoals } from '../../services/goal';

export default function useGoals(forceDispatch: boolean = false): undefined | CurrentGoals {
  const dispatch = useDispatch();
  const { data } = useSelector((state: { currentGoals: CurrentGoalsState }) => state.currentGoals);

  React.useEffect(() => {
    if (!data || forceDispatch) {
      dispatch(fetchGoals());
    }
  }, []);

  return data;
}
