import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContextProvider';

function useGlobalContext() {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error('useGlobalContext must be used within the GlobalContext.Provider');
  }
  return globalContext;
}

export default useGlobalContext;
