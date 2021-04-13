import { useEffect } from 'react';
import useGlobalContext from './useGlobalContext';

function useExDataLoading() {
  const { setIsLoading } = useGlobalContext();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
}

export default useExDataLoading;
