import { useState } from 'react';
import { GlobalDataType } from '../../context/types';
import { TokenItem } from '../../services/auth';
import { CaptureGoalData, GoalDetails } from '../../types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [entityId, setEntityId] = useState<string>('');
  const [goalDetails, setGoalDetails] = useState<GoalDetails>({});
  const [goalCapture, setGoalCapture] = useState<CaptureGoalData>({} as CaptureGoalData);
  const [twoStepAuthCode, setTwoStepAuthCode] = useState<string>('');
  const [accessTokens, setAccessTokens] = useState<TokenItem[]>([]);
  const [contactId, setContactId] = useState<string>('');

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
    twoStepAuthCode,
    setTwoStepAuthCode,
    accessTokens,
    setAccessTokens,
    contactId,
    setContactId,
  };
}

export default useGlobalContextValue;
