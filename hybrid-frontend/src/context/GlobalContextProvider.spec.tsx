import React from 'react';
import { render } from '@testing-library/react';
import { GlobalProvider, GlobalContext } from './GlobalContextProvider';

describe('GlobalContextProvider', () => {
  const globalDataContextDefaultValue = {
    examples: [],
    isLoading: false,
    fetchData: () => null,
    removeData: () => null,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const customRender = (
    ui: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined,
    { providerProps, ...renderOptions }: any
  ) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    render(
      <GlobalContext.Provider value={globalDataContextDefaultValue}>{ui}</GlobalContext.Provider>,
      renderOptions
    );

  test('Renders the provider component', async () => {
    render(
      <GlobalProvider>
        <div>test</div>
      </GlobalProvider>
    );
  });
});
