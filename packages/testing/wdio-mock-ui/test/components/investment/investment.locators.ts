import { expect } from 'chai'
import { url } from '../../environments/stage'

// chart period options
export enum Period {
  OneWeek = '1w',
  OneMonth = '1m',
  ThreeMonths = '3m',
  SixMonths = '6m',
  OneYear = '1y',
  FiveYears = '5y',
}

// headings
export const headingTitleLabel = () =>
  $('div[data-testid="page-heading"] > h2.MuiTypography-root.MuiTypography-body1')
export const headingTotalLabel = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-disableGutters.MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-container:nth-child(3) .MuiGrid-item:nth-child(1) > h2.MuiTypography-body1'
  )
export const headingUserLabel = () =>
  $('div[data-testid="page-heading"] > h1.MuiTypography-root.MuiTypography-body1')

// period domain switch
export const chartPeriodSwitch = () =>
  $('.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div')
export const chartPeriodSwitchBtn = (index) =>
  $(
    '.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div > button:nth-child(' +
      index +
      ')'
  )

export const getChartPeriodOptionLocator = (period: string) => {
  let index = ''
  switch (period) {
    case '1w':
      index = '1'
      break
    case '1m':
      index = '2'
      break
    case '3m':
      index = '3'
      break
    case '6m':
      index = '4'
      break
    case '1y':
      index = '5'
      break
    case '5y':
      index = '6'
      break
  }
  const locator = $('.fKhQRz > button:nth-child(' + index + ')')
  return locator
}

export const checkChartPeriodIs = async (period: Period) => {
  const element = await getChartPeriodOptionLocator(period)
  expect(await element.waitForClickable()).to.be.true
  const attribute = await element.getAttribute('class')
  expect(attribute).to.contain('cjTDOR')
}

export const setChartPeriodTo = async (period: Period) => {
  const element = await getChartPeriodOptionLocator(period)
  expect(await element.waitForClickable()).to.be.true
  await element.click()
  const attribute = await element.getAttribute('class')
  expect(attribute).to.contain('cjTDOR')
}

// cards
// #region summary
export const totalTitle = () =>
  $('.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h6.MuiTypography-body1')
export const totalTooltip = () =>
  $(
    '.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h6.MuiTypography-body1 > span'
  )
export const totalValue = () =>
  $('.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h5.MuiTypography-body1')
export const netContributionTitle = () =>
  $(
    '.MuiGrid-container:nth-child(1) .MuiGrid-item .MuiGrid-item:nth-child(2) div.MuiGrid-root.MuiGrid-item:nth-child(2) div div:nth-child(1) > h6.MuiTypography-body1'
  )
export const netContributionTooltip = () =>
  $(
    '.MuiGrid-container:nth-child(1) .MuiGrid-item .MuiGrid-item:nth-child(2) div.MuiGrid-root.MuiGrid-item:nth-child(2) div div:nth-child(1) > h6.MuiTypography-body1 > span'
  )
export const netContributionValue = () =>
  $(
    '.MuiGrid-justify-xs-space-between .MuiGrid-wrap-xs-nowrap .MuiGrid-align-items-xs-center.MuiGrid-align-content-xs-flex-start.MuiGrid-grid-xs-12 div.MuiGrid-root.MuiGrid-item:nth-child(2) div div div h5'
  )
export const lifetimeReturnTitle = () =>
  $(
    '.MuiGrid-root:nth-child(1) .MuiGrid-container:nth-child(2) .MuiGrid-item:nth-child(4) div div:nth-child(1) > h6'
  )
export const lifetimeReturnTooltip = () =>
  $(
    '.MuiGrid-root:nth-child(1) .MuiGrid-container:nth-child(2) .MuiGrid-item:nth-child(4) div div:nth-child(1) > h6 > span'
  )
export const lifetimeReturnValue = () =>
  $(
    '.MuiGrid-root:nth-child(1) .MuiGrid-container:nth-child(2) .MuiGrid-item:nth-child(4) div div:nth-child(1) > div > h5'
  )
export const lifetimeReturnRating = () =>
  $(
    '.MuiGrid-root:nth-child(1) .MuiGrid-container:nth-child(2) .MuiGrid-item:nth-child(4) div div:nth-child(1) > div > div > h6'
  )
export const lastPeriodReturnTitle = () =>
  $(
    '.MuiGrid-item:nth-child(2) div:nth-child(4) > div:nth-child(1) > h6.MuiTypography-root.MuiTypography-body1'
  )
export const lastPeriodReturnTooltip = () =>
  $(
    '.MuiGrid-item:nth-child(2) div:nth-child(4) > div:nth-child(1) > h6.MuiTypography-root.MuiTypography-body1 > span'
  )
export const lastPeriodReturnValue = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-disableGutters.MuiContainer-maxWidthLg div.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-item.MuiGrid-grid-xs-12:nth-child(1) .MuiPaper-rounded .MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.MuiGrid-justify-xs-space-between div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-wrap-xs-nowrap.MuiGrid-align-items-xs-center.MuiGrid-justify-xs-flex-end.MuiGrid-grid-xs-4:nth-child(2) div:nth-child(4) div:nth-child(1) > div > h5'
  )
export const lastPeriodReturnRating = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-disableGutters.MuiContainer-maxWidthLg div.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-item.MuiGrid-grid-xs-12:nth-child(1) .MuiPaper-rounded .MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3.MuiGrid-justify-xs-space-between div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-wrap-xs-nowrap.MuiGrid-align-items-xs-center.MuiGrid-justify-xs-flex-end.MuiGrid-grid-xs-4:nth-child(2) div:nth-child(4) div:nth-child(1) > div div > h6'
  )
// #endregion

// cards
// #region your accounts
// header
export const yHeader = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(2) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root > h4'
  )
export const yOpenAnAcc = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(2) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root > div button'
  )
export const yOpenAnAccTooltip = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(2) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root div[title="Coming soon"]'
  )
export const yAccountTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(1) > h6'
  )
export const yHoldingsTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(2) > h6'
  )
export const yHoldingsTableHeaderTooltip = () =>
  $(
    'div.MuiBox-root:nth-child(2) div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiIconButton-sizeSmall[aria-label="TOTAL HOLDINGS Info"]'
  )
export const yNetContributionTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(3) > h6'
  )
export const yNetContributionsTableHeaderTooltip = () =>
  $(
    'div.MuiBox-root:nth-child(2) div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiIconButton-sizeSmall[aria-label="NET CONTRIBUTIONS Info"]'
  )
export const yCashTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(4) > h6'
  )
export const yLastPeriodReturnTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(5) > h6'
  )
export const yLastPeriodReturnTableHeaderTooltip = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(2) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(5) > button'
  )

// investment account
export const yAccount1 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(2) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(1) td > h6'
  )
export const yHoldingsAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(2) > p'
  )
export const yNetContributionsAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(3) > p'
  )
export const yCashAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(4) > div > p'
  )
export const yLastPeriodReturnAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(5) > div > p'
  )
export const yLastPeriodReturnRatingAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(5) div > h6'
  )

// ISA
export const yAccount2 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(2) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(2) td > h6'
  )
export const yHoldingsAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(2) > p'
  )
export const yNetContributionsAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(3) > p'
  )
export const yCashAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(4) > div > p'
  )
export const yLastPeriodReturnAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(5) > div > p'
  )
export const yLastPeriodReturnRatingAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(5) div > h6'
  )

// SIPP
export const yAccount3 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(2) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(3) td > h6'
  )
export const yHoldingsAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(2) > p'
  )
export const yNetContributionsAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(3) > p'
  )
export const yCashAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(4) > div > p'
  )
export const yLastPeriodReturnAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(5) > div > p'
  )
export const yLastPeriodReturnRatingAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(2) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(5) div > h6'
  )
// #endregion

// cards
// #region linked accounts
// header
export const lHeader = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(3) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root > h4'
  )
export const lLinkAnAcc = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(3) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root > div button'
  )
export const lLinkAnAccTooltip = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(3) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root div[title="Coming soon"]'
  )
export const lAccountTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(1) > h6'
  )
export const lHoldingsTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(2) > h6'
  )
export const lHoldingsTableHeaderTooltip = () =>
  $(
    '.MuiBox-root:nth-child(2) div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiIconButton-sizeSmall[aria-label="TOTAL HOLDINGS Info"]'
  )
export const lNetContributionTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(3) > h6'
  )
export const lNetContributionsTableHeaderTooltip = () =>
  $(
    '.MuiBox-root:nth-child(2) div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-6.MuiGrid-item:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiIconButton-sizeSmall[aria-label="NET CONTRIBUTIONS Info"]'
  )
export const lCashTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(4) > h6'
  )
export const lLastPeriodReturnTableHeader = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(5) > h6'
  )
export const lLastPeriodReturnTableHeaderTooltip = () =>
  $(
    '.MuiGrid-spacing-xs-6 > .MuiGrid-grid-xs-12:nth-child(3) table[aria-label="accounts table"] .MuiTableRow-head > th:nth-child(5) > button'
  )

// account 1
export const lAccount1 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(3) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(1) td > h6'
  )
export const lHoldingsAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(1) td:nth-child(2) > p'
  )
export const lNetContributionsAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(1) td:nth-child(3) > p'
  )
export const lCashAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(1) td:nth-child(4) > div > p'
  )
export const lLastPeriodReturnAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(5) > div > p'
  )
export const lLastPeriodReturnRatingAccount1 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(1) td:nth-child(5) div > h6'
  )

// account 2
export const lAccount2 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(3) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(2) td > h6'
  )
export const lHoldingsAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(2) td:nth-child(2) > p'
  )
export const lNetContributionsAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(2) td:nth-child(3) > p'
  )
export const lCashAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(2) td:nth-child(4) > div > p'
  )
export const lLastPeriodReturnAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(5) > div > p'
  )
export const lLastPeriodReturnRatingAccount2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(2) td:nth-child(5) div > h6'
  )

// account 3
export const lAccount3 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(3) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(3) td > h6'
  )
export const lHoldingsAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(3) td:nth-child(2) > p'
  )
export const lNetContributionsAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(3) td:nth-child(3) > p'
  )
export const lCashAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(3) td:nth-child(4) > div > p'
  )
export const lLastPeriodReturnAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(5) > div > p'
  )
export const lLastPeriodReturnRatingAccount3 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(3) td:nth-child(5) div > h6'
  )

// account 4
export const lAccount4 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(3) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(4) td > h6'
  )
export const lHoldingsAccount4 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(4) td:nth-child(2) > p'
  )
export const lNetContributionsAccount4 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(4) td:nth-child(3) > p'
  )
export const lCashAccount4 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(4) td:nth-child(4) > div > p'
  )
export const lLastPeriodReturnAccount4 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(4) td:nth-child(5) > div > p'
  )
export const lLastPeriodReturnRatingAccount4 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(4) td:nth-child(5) div > h6'
  )

// account 5
export const lISA2 = () =>
  $(
    '.MuiGrid-grid-xs-12:nth-child(3) > .MuiPaper-rounded table[aria-label="accounts table"] tr:nth-child(5) td > h6'
  )
export const lHoldingsISA2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(5) td:nth-child(2) > p'
  )
export const lNetContributionsISA2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(5) td:nth-child(3) > p'
  )
export const lCashISA2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root .MuiTableBody-root tr:nth-child(5) td:nth-child(4) > div > p'
  )
export const lLastPeriodReturnISA2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(5) td:nth-child(5) > div > p'
  )
export const lLastPeriodReturnRatingISA2 = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(3) .MuiPaper-rounded .MuiGrid-spacing-xs-1 .MuiGrid-grid-xs-12:nth-child(2) .MuiTableContainer-root table.MuiTable-root tbody.MuiTableBody-root tr:nth-child(5) td:nth-child(5) div > h6'
  )
// #endregion

// card
// #region performance chart
export const pTotalValueTitle = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:first-child > div:nth-child(2) > h6'
  )
export const pTotalValue = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:first-child > div:nth-child(2) > div:nth-of-type(1) > h6'
  )
export const pNetContributedTitle = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:nth-child(2) > div:nth-of-type(2) > h6'
  )
export const pNetContributedValue = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:nth-child(2) > div:nth-of-type(2) > div > h6'
  )
export const pTotalReturnTitle = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:nth-child(3) > div > h6'
  )
export const pTotalReturnValue = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:nth-child(3) > div > div > h6'
  )
export const pTotalReturnRating = () =>
  $(
    '.MuiBox-root:nth-child(2) .MuiGrid-spacing-xs-6:nth-child(5) .MuiGrid-grid-xs-12:nth-child(4) .MuiPaper-rounded .MuiGrid-grid-xs-12:nth-child(2) .MuiBox-root div div:nth-child(1) > div:nth-of-type(1) > div:nth-child(3) > div > div > div > h6'
  )

// X axis
export const pChartXLevel1 = () => $('.visx-group .visx-axis-left g:nth-child(1) tspan')
export const pChartXLevel2 = () => $('.visx-group .visx-axis-left g:nth-child(2) tspan')
export const pChartXLevel3 = () => $('.visx-group .visx-axis-left g:nth-child(3) tspan')
export const pChartXLevel4 = () => $('.visx-group .visx-axis-left g:nth-child(4) tspan')
export const pChartXLevel5 = () => $('.visx-group .visx-axis-left g:nth-child(5) tspan')
export const pChartXLevel6 = () => $('.visx-group .visx-axis-left g:nth-child(6) tspan')

// Y axis visx-axis-tick
export const pChartYLevel1 = () => $('.visx-group .visx-axis-bottom g:nth-child(1) tspan')
export const pChartYLevel2 = () => $('.visx-group .visx-axis-bottom g:nth-child(2) tspan')
export const pChartYLevel3 = () => $('.visx-group .visx-axis-bottom g:nth-child(3) tspan')
export const pChartYLevel4 = () => $('.visx-group .visx-axis-bottom g:nth-child(4) tspan')
export const pChartYLevel5 = () => $('.visx-group .visx-axis-bottom g:nth-child(5) tspan')

// line path
export const pChartLineTotalValue = () =>
  $('.visx-group .visx-group > .visx-linepath[stroke-width="4"]')
export const pChartLineNetContributed = () =>
  $('.visx-group .visx-group > .visx-linepath[stroke-width="2"]')

// marker line
export const pChartMarkerLine = () =>
  $('svg >.visx-group:nth-of-type(1) > .visx-group:nth-of-type(5) > .visx-line')
export const pChartMarkerCircleTotalValue = () =>
  $('.visx-group .visx-group > .visx-circle[pointer-events="none"]:nth-of-type(1)')
export const pChartMarkerCircleNetContributed = () =>
  $('.visx-group .visx-group > .visx-circle[pointer-events="none"]:nth-of-type(2)')

// #endregion

// url
export const investmentUrl = url + '/accounts'
