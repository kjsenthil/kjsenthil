import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ExampleData {
  id: number;
  title: string;
  body: string;
}

export type GoalCaptureType = Record<string, unknown>;

export interface GlobalDataType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  goalCapture: GoalCaptureType;
  setGoalCapture: Dispatch<SetStateAction<GoalCaptureType>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
