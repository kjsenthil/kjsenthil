import { Dispatch, ReactNode, SetStateAction } from 'react';
import { CaptureGoalData, GoalDetails } from '../types';

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
}

export interface GlobalProviderProps {
  children: ReactNode;
}
