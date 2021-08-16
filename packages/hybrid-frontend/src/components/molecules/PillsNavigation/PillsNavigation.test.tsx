import * as React from 'react';
import { screen, renderWithTheme } from '@tsw/test-util';
import PillsNavigation from './PillsNavigation';
import PillsNavigationTab from './PillsNavigationTab/PillsNavigationTab.styles';
import {
  PillNavigationCreatorTabComponent,
  PillsNavigationSelectableTabComponent,
} from './PillsNavigationTabComponent/PillsNavigationTabComponent';

describe('PillsNavigation', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <PillsNavigation value="Pill 1">
        <PillsNavigationTab
          component={PillsNavigationSelectableTabComponent}
          label="Pill 1"
          value="Pill 1"
        />
        <PillsNavigationTab
          component={PillNavigationCreatorTabComponent}
          label="Pill 2"
          value="Pill 2"
        />
      </PillsNavigation>
    );

    expect(screen.getByText('Pill 1')).toBeVisible();
    expect(screen.getByText('Pill 2')).toBeVisible();
  });
});
