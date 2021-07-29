import * as React from 'react';
import { Tabs, Tab, TabsProps, TabProps } from '../../atoms';

export interface TabsNavigationProps {
  currentPath: string;
  onClick: (to: string) => void;

  tabs: Array<{ label: string; path: string; disabled?: boolean }>;

  tabsProps?: Omit<TabsProps, 'value' | 'onChange'>;
  tabProps?: Omit<TabProps, 'label' | 'value'>;
}

/**
 * The aim is to remove potential trailing '/', if necessary
 */
export function getNormalizedPath(path: string): string {
  return path.replace(/\/$/, '');
}

export function getCurrentTab({
  currentPath,
  tabPaths,
}: {
  currentPath: string;
  tabPaths: string[];
}): string | undefined {
  const normalizedCurrentPath = getNormalizedPath(currentPath);

  return tabPaths.find((tabPath) => getNormalizedPath(tabPath) === normalizedCurrentPath);
}

export default function TabsNavigation({
  currentPath,
  onClick,
  tabs,
  tabsProps,
  tabProps,
}: TabsNavigationProps) {
  const currentTab = getCurrentTab({
    currentPath,
    tabPaths: tabs.map(({ path }) => path),
  });

  const handleOnChange = (e: React.ChangeEvent<{}>, newTab: string) => {
    onClick(newTab);
  };

  return (
    // Material-UI requires the 'value' prop to be 'false' if no valid tab is
    // found
    <Tabs value={currentTab ?? false} onChange={handleOnChange} {...tabsProps}>
      {tabs.map(({ label, path, disabled }) => (
        <Tab key={path} label={label} value={path} disabled={!!disabled} {...tabProps} />
      ))}
    </Tabs>
  );
}
