import React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import TargetDatePage, { titleText } from './TargetDatePage';
import { GlobalProvider } from '../../../context/GlobalContextProvider';
import useGlobalContextValue from '../../../hooks/GlobalContextHooks/useGlobalContextValue';

jest.mock('../../../hooks/GlobalContextHooks/useGlobalContextValue');

describe('TargetDatePage', () => {
  let inputField: HTMLElement;

  test('TargetDatePage titles and field has been successfully rendered', () => {
    renderWithTheme(<TargetDatePage />);
    expect(screen.getByText(titleText)).toBeInTheDocument();
    inputField = screen.getByPlaceholderText('Target Date');
    expect(inputField).toBeInTheDocument();
  });

  test('TargetDatePage Onchange event', async () => {
    const setGoalCaptureMock = jest.fn();

    (useGlobalContextValue as jest.Mock).mockImplementation(() => ({
      goalCapture: {},
      setGoalCapture: setGoalCaptureMock,
    }));

    renderWithTheme(
      <GlobalProvider>
        <TargetDatePage />
      </GlobalProvider>
    );

    inputField = screen.getByPlaceholderText('Target Date');
    fireEvent.change(inputField, { target: { value: '2023-06-07' } });
    expect(useGlobalContextValue).toHaveBeenCalledTimes(1);
    expect(setGoalCaptureMock).toHaveBeenCalledTimes(1);
  });
});
