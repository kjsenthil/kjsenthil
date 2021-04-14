import { useState } from 'react';
import { GlobalDataType, GoalCaptureType } from '../../context/types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [goalCapture, setGoalCapture] = useState<GoalCaptureType>({});
  const [entityId, setEntityId] = useState<string>('');

  return {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    goalCapture,
    setGoalCapture,
    entityId,
    setEntityId,
  };
}

export default useGlobalContextValue;
