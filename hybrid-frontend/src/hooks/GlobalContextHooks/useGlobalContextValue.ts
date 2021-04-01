import { useState, useMemo } from 'react';
import { GlobalDataType } from '../../context/types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return useMemo(
    () => ({
      isLoading,
      setIsLoading,
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoading, setIsLoading, isLoggedIn, setIsLoggedIn]
  );
}

export default useGlobalContextValue;
