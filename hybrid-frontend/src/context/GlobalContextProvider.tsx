import React, { createContext, FC, ReactNode } from 'react';
import { GlobalDataType, GlobalProviderProps } from './types';
import useGlobalContextValue from '../hooks/GlobalContextHooks/useGlobalContextValue';

export const globalDataContextDefaultValue: GlobalDataType = {
  isLoading: false,
  setIsLoading: () => true,
};

export const GlobalContext = createContext<GlobalDataType>(globalDataContextDefaultValue);

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const globalContextValue = useGlobalContextValue();

  return <GlobalContext.Provider value={globalContextValue}>{children}</GlobalContext.Provider>;
};

export default ({ element }: { element: ReactNode }) => <GlobalProvider>{element}</GlobalProvider>;
