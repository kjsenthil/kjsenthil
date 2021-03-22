import { useState, useMemo } from 'react';
import { GlobalDataType } from '../../context/types';

function useGlobalContextValue(): GlobalDataType {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading, setIsLoading]
  );
}

export default useGlobalContextValue;
