import { useState } from 'react';
import { GlobalDataType } from '../../context/types';
import { CaptureGoalData, GoalDetails } from '../../types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [entityId, setEntityId] = useState<string>('');
  const [goalDetails, setGoalDetails] = useState<GoalDetails>({});
  const [goalCapture, setGoalCapture] = useState<CaptureGoalData>({} as CaptureGoalData);

  return {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    goalCapture,
    setGoalCapture,
    entityId,
    setEntityId,
    goalDetails,
    setGoalDetails,
  };
}

export default useGlobalContextValue;
