import { useState } from 'react';
import { GlobalDataType, GoalCaptureType } from '../../context/types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [goalCapture, setGoalCapture] = useState<GoalCaptureType>({});

  return {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    goalCapture,
    setGoalCapture,
  };
}

export default useGlobalContextValue;
