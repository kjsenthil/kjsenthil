import { fireEvent } from '@testing-library/react';
import * as React from 'react';
import { renderWithTheme } from '@tsw/test-util';
import { useBreakpoint } from '../../../hooks';
import AccountFilter, { AccountFilterProps } from './AccountFilter';

jest.mock('../../../hooks');

const allAccountsLabel = 'All accounts';
const myAccountsLabel = 'My accounts';
const linkedAccountsLabel = 'Linked accounts';
const createPortfolioLabel = 'Create a portfolio';

const filterOptions = [
  { label: myAccountsLabel, value: 'my-accounts' },
  { label: linkedAccountsLabel, value: 'linked-accounts' },
  { label: allAccountsLabel, value: 'all-accounts' },
];

describe('AccountFilter', () => {
  const onSelectionChanged = jest.fn();
  const defaultProps = {
    hasLinkedAccounts: true,
    selection: 'all-accounts',
    onSelectionChanged,
  };

  const render = (additionalProps?: Partial<AccountFilterProps>) => {
    const props = { ...defaultProps, ...additionalProps };
    return renderWithTheme(<AccountFilter {...props} />);
  };

  describe('pill filters (desktop)', () => {
    beforeEach(() => {
      (useBreakpoint as jest.Mock).mockReturnValue({ isMobile: false });
    });

    it('renders all filters correctly', () => {
      const testTexts = [
        allAccountsLabel,
        myAccountsLabel,
        linkedAccountsLabel,
        createPortfolioLabel,
      ];

      const {
        result: { getByText },
      } = render();

      testTexts.forEach((testText) => {
        expect(getByText(testText)).toBeVisible();
      });
    });

    it('calls setSelection when selection is changed', () => {
      const {
        result: { getByText },
      } = render();

      filterOptions.forEach(({ label, value }) => {
        getByText(label).click();
        expect(onSelectionChanged).toHaveBeenCalledWith(value);
      });
    });

    it("doesn't call setSelection when 'Create a portfolio' is clicked", () => {
      const {
        result: { getByText },
      } = render();

      const createPortfolio = getByText(createPortfolioLabel);
      createPortfolio.click();

      expect(onSelectionChanged).not.toHaveBeenCalled();
    });

    it("only renders 'All accounts' filter if no linked accounts", () => {
      const visiblePills = [allAccountsLabel, createPortfolioLabel];
      const missingPills = [myAccountsLabel, linkedAccountsLabel];

      const {
        result: { getByText, queryByText },
      } = render({ hasLinkedAccounts: false });

      visiblePills.forEach((label) => {
        expect(getByText(label)).toBeVisible();
      });
      missingPills.forEach((label) => {
        expect(queryByText(label)).toBeNull();
      });
    });
  });

  describe('select box (mobile)', () => {
    beforeEach(() => {
      (useBreakpoint as jest.Mock).mockReturnValue({ isMobile: true });
    });

    it('renders all filters correctly', () => {
      const {
        result: { getByRole, getByText },
      } = render();

      const combobox = getByRole('combobox');
      expect(combobox.childElementCount).toEqual(3);

      filterOptions.forEach(({ label }) => {
        expect(getByText(label)).toBeInTheDocument();
      });
    });

    it('calls setSelection when selection is changed', () => {
      const {
        result: { getByRole },
      } = render();

      const combobox = getByRole('combobox');

      filterOptions.forEach(({ value }) => {
        fireEvent.change(combobox, { target: { value } });
        expect(onSelectionChanged).toHaveBeenCalledWith(value);
      });
    });

    it("only renders 'All accounts' option if no linked accounts", () => {
      const {
        result: { getByRole, getByText, queryByText },
      } = render({ hasLinkedAccounts: false });

      const combobox = getByRole('combobox');

      expect(combobox.childElementCount).toEqual(1);
      expect(getByText(allAccountsLabel)).toBeInTheDocument();
      [myAccountsLabel, linkedAccountsLabel].forEach((missingLabel) => {
        expect(queryByText(missingLabel)).toBeNull();
      });
    });
  });
});
