import { Dispatch, ReactNode, SetStateAction } from 'react';
import { TokenItem } from '../services/auth';
import { CaptureGoalData, GoalDetails } from '../services/goalsAndObjectives';

export interface GlobalDataType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  goalCapture: CaptureGoalData;
  setGoalCapture: Dispatch<SetStateAction<CaptureGoalData>>;
  entityId: string;
  setEntityId: Dispatch<SetStateAction<string>>;
  goalDetails: GoalDetails;
  setGoalDetails: Dispatch<SetStateAction<GoalDetails>>;
  twoStepAuthCode: string;
  setTwoStepAuthCode: Dispatch<SetStateAction<string>>;
  accessTokens: TokenItem[];
  setAccessTokens: Dispatch<SetStateAction<TokenItem[]>>;
  contactId: string;
  setContactId: Dispatch<SetStateAction<string>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
