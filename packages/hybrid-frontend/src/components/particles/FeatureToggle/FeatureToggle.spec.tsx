// eslint-disable no-console
import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import FeatureToggle from '.';
import { useFeatureFlag } from '../../../hooks/FeatureFlagsHooks';

jest.mock('../../../hooks/FeatureFlagsHooks/useFeatureFlag');

describe('FeatureToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('The enabled feature renders the new version and does not render the old version', () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(true);

    renderWithTheme(
      <FeatureToggle name="FeatureA" fallback={<div>Enabled feature - Old</div>}>
        <div>Enabled feature - New</div>
      </FeatureToggle>
    );

    expect(screen.queryByText('Enabled feature - Old')).not.toBeInTheDocument();
    expect(screen.getByText('Enabled feature - New')).toBeInTheDocument();
  });

  test('The disabled feature renders the old version and does not render the new version', () => {
    (useFeatureFlag as jest.Mock).mockReturnValue(false);

    renderWithTheme(
      <FeatureToggle name="FeatureB" fallback={<div>Disabled feature - Old</div>}>
        <div>Disabled feature - New</div>
      </FeatureToggle>
    );

    expect(screen.getByText('Disabled feature - Old')).toBeInTheDocument();
    expect(screen.queryByText('Disabled feature - New')).not.toBeInTheDocument();
  });

  test('The FeatureToggle component renders the old version if there is an error retrieving the feature flag', () => {
    // Disable the console messages that get printed out when <FeatureToggle /> errors
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    (useFeatureFlag as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    renderWithTheme(
      <FeatureToggle name="FeatureC" fallback={<div>Enabled feature - Old</div>}>
        <div>Enabled feature - New</div>
      </FeatureToggle>
    );

    expect(screen.getByText('Enabled feature - Old')).toBeInTheDocument();
    expect(screen.queryByText('Enabled feature - New')).not.toBeInTheDocument();

    // Restore console message functionality
    consoleWarn.mockRestore();
    consoleError.mockRestore();
  });
});
