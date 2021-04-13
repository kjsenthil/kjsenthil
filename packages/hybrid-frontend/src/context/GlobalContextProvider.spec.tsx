import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalProvider, GlobalContext } from './GlobalContextProvider';

const CustomComponent = () => {
  const { isLoading, isLoggedIn, setIsLoading } = React.useContext(GlobalContext);

  setIsLoading(true);

  return (
    <>
      <div>{isLoading ? 'loading' : 'loaded'}</div>
      <div>{isLoggedIn ? 'logged in' : 'logged out'}</div>
    </>
  );
};

describe('GlobalContextProvider', () => {
  test('renders a given element as child', () => {
    render(
      <GlobalProvider>
        <CustomComponent />
      </GlobalProvider>
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(screen.getByText('logged out')).toBeInTheDocument();
  });
});
