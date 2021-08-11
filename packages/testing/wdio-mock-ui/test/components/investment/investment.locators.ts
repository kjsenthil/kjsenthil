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
export const chartPeriodSwitch = () => $('.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div')
export const chartPeriodSwitchBtn = async (index) =>
  await $('.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div > button:nth-child(' + index + ')')

export const getChartPeriodOptionLocator = async (period: string) => {
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
// #endregion

// cards
// #region linked accounts
// header
export const lHeader = () =>
  $(
    '.MuiContainer-disableGutters .MuiContainer-maxWidthLg .MuiBox-root:nth-child(2) .MuiGrid-item:nth-child(5) .MuiGrid-item:nth-child(3) .MuiPaper-rounded .MuiGrid-container .MuiGrid-item:nth-child(1) .MuiBox-root > h4'
  )
// #endregion

// url
export const investmentUrl = url + '/accounts'
