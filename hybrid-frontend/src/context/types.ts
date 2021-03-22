import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ExampleData {
  id: number;
  title: string;
  body: string;
}

export interface GlobalDataType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}
