import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import TabsNavigation, { getNormalizedPath, getCurrentTab } from './TabsNavigation';

describe('TabsNavigation', () => {
  const mockNavigate = jest.fn();

  const tabs = [
    { path: '/abc', label: 'Abc' },
    { path: '/def', label: 'Def' },
  ];

  let tab1;
  let tab2;

  beforeEach(() => {
    jest.clearAllMocks();

    renderWithTheme(<TabsNavigation currentPath="/" navigate={mockNavigate} tabs={tabs} />);

    tab1 = screen.getByText(tabs[0].label);
    tab2 = screen.getByText(tabs[1].label);
  });

  it('renders correctly', () => {
    expect(tab1).toBeVisible();
    expect(tab2).toBeVisible();
  });

  it('calls the navigate function as expected', () => {
    fireEvent.click(tab1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(tabs[0].path);

    fireEvent.click(tab2);
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith(tabs[1].path);
  });

  describe('getNormalizedPath', () => {
    const testCases = [
      ['', ''],
      ['/', ''],
      ['abc/def', 'abc/def'],
      ['abc/def/', 'abc/def'],
    ];

    test.each(testCases)('it works as expected when path is %p', (path, expected) => {
      expect(getNormalizedPath(path)).toBe(expected);
    });
  });

  describe('getCurrentTab', () => {
    const testTabPaths = ['abc', 'def/ghi', 'jkl/'];

    const testCases: Array<[string, string[], string | undefined]> = [
      ['', testTabPaths, undefined],
      ['abc', testTabPaths, 'abc'],
      ['abc/', testTabPaths, 'abc'],
      ['def', testTabPaths, undefined],
      ['def/ghi', testTabPaths, 'def/ghi'],
      ['def/ghi/', testTabPaths, 'def/ghi'],
      ['jkl', testTabPaths, 'jkl'],
      ['jkl/', testTabPaths, 'jkl'],
    ];

    test.each(testCases)(
      'it works as expected when current path is %p',
      (currentPath, tabPaths) => {
        expect(getCurrentTab({ currentPath, tabPaths }));
      }
    );
  });
});
