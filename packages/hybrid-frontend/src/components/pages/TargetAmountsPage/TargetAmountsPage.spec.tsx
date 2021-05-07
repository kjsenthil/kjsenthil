import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import TargetAmountsPage, { titleText } from './TargetAmountsPage';
import { GlobalProvider } from '../../../context/GlobalContextProvider';
import useGlobalContextValue from '../../../hooks/GlobalContextHooks/useGlobalContextValue';

jest.mock('../../../hooks/GlobalContextHooks/useGlobalContextValue');

describe('TargetAmountsPage', () => {
  let inputField: HTMLElement;

  test('TargetAmountsPage titles and field has been successfully rendered', () => {
    renderWithTheme(<TargetAmountsPage />);
    expect(screen.getByText(titleText)).toBeInTheDocument();
    inputField = screen.getByPlaceholderText('Target Amount');
    expect(inputField).toBeInTheDocument();
  });

  test('TargetAmountsPage Onchange event', async () => {
    const setGoalCaptureMock = jest.fn();

    (useGlobalContextValue as jest.Mock).mockImplementation(() => ({
      goalCapture: {},
      setGoalCapture: setGoalCaptureMock,
    }));

    renderWithTheme(
      <GlobalProvider>
        <TargetAmountsPage />
      </GlobalProvider>
    );

    inputField = screen.getByPlaceholderText('Target Amount');
    fireEvent.change(inputField, { target: { value: '4000' } });
    expect(useGlobalContextValue).toHaveBeenCalledTimes(1);
    expect(setGoalCaptureMock).toHaveBeenCalledTimes(1);
  });
});
