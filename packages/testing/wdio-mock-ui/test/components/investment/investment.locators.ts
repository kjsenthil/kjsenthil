import { url } from '../../environments/env'

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
export const headingTotalLabel = () => $('.MuiGrid-grid-sm-9 > h2')

// period domain switch
export const chartPeriodSwitch = () => $('.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div')
export const chartPeriodSwitchBtn = (index) =>
  $('.MuiGrid-grid-xs-12 .MuiGrid-grid-xs-6.MuiGrid-grid-sm-3 > div > button:nth-child(' + index + ')')

// cards
// #region summary
export const netContributionTitle = () =>
  $('.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h6.MuiTypography-body1')
export const netContributionTooltip = () =>
  $('.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h6.MuiTypography-body1 > span')
export const netContributionValue = () =>
  $('.MuiGrid-grid-xs-8:nth-child(1) .MuiGrid-item:nth-child(1) div div h5.MuiTypography-body1')
export const lifetimeReturnTitle = () => $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(3) > div > div > h6')
export const lifetimeReturnTooltip = () =>
  $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(3) > div > div > h6 > span')
export const lifetimeReturnValue = () => $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(3) div > h5')
export const lifetimeReturnRating = () =>
  $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(3) > div div > div h6')
export const annualisedTitle = () => $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(5) > div > div > h6')
export const annualisedTooltip = () =>
  $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(5) > div > div > h6 > span')
export const annualisedValue = () => $('.MuiGrid-grid-xs-8 .MuiGrid-container div:nth-of-type(5) div > h5')
export const lastPeriodReturnTitle = () =>
  $('.MuiGrid-item:nth-child(2) div:nth-child(4) > div:nth-child(1) > h6.MuiTypography-root.MuiTypography-body1')
export const lastPeriodReturnTooltip = () =>
  $('.MuiGrid-item:nth-child(2) div:nth-child(4) > div:nth-child(1) > h6.MuiTypography-root.MuiTypography-body1 > span')
export const lastPeriodReturnValue = () => $('.MuiGrid-grid-xs-4 .MuiGrid-align-items-xs-center > div > h5')
export const lastPeriodReturnRating = () => $('.MuiGrid-grid-xs-4 .MuiGrid-align-items-xs-center > div div > h6')
// #endregion

// cards
// #region your accounts
// header

const tableHeader = (index1: number, index2: number) => {
  const headerIndex = `[${index1}]`
  return $(`//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]${headerIndex}`).$('thead').$('tr').$$('th')[
    index2
  ]
}
const acctHeader = (index: number) => {
  const acctName = `[${index}]`
  return $(`//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]${acctName}/div//div/div/h4`)
}
const toolTip = (index: number) => {
  const tableHeaderIndex = `[${index}]`
  return $(`//div//thead/tr/th${tableHeaderIndex}//div//div/button`)
}

export const myAccountHeader = () => acctHeader(2)
export const myOpenAnAcc = () =>
  $('//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][2]/div//div//div/div//div/div')
export const myAccountTableHeader = () => tableHeader(2, 0)
export const myInvestmentsTableHeader = () => tableHeader(2, 1)
export const myCashTableHeader = () => tableHeader(2, 2)
export const myTotaValueTableHeader = () => tableHeader(2, 3)
export const myLifeTimeHeader = () => tableHeader(2, 4)
export const myAnnulisedTableHeader = () => tableHeader(2, 5)
export const myLast5yReturnTableHeader = () => tableHeader(2, 6)

export const InvestmentsToolTip = () => toolTip(2)
export const TotalValueTooltip = () => toolTip(4)
export const LifetimeReturnTooltip = () => toolTip(5)
export const AnnualisedReturnTooltip = () => toolTip(6)
export const Last5yReturnTooltip = () => toolTip(7)

// investment account
const myGIAAccount1Rows = (index: number) => {
  return $('.MuiTableBody-root').$$('tr')[0]?.$$('td')[index]?.$('p')
}
export const myAccountItem = () => {
  return $('.MuiTableBody-root').$$('tr')[0]?.$('h6')
}

export const myAccount1 = () => $('.MuiTableBody-root').$$('tr')[0]?.$('h6')
export const myInvestmentAccount1 = () => myGIAAccount1Rows(1)
export const myCashAccount1 = () => myGIAAccount1Rows(2)
export const myTotalValue = () => myGIAAccount1Rows(3)
export const myLifeTimeReturn = () => myGIAAccount1Rows(4)
export const myAnnualisedReturn = () => myGIAAccount1Rows(5)
export const myLast5yReturn = () => myGIAAccount1Rows(6)
export const myLast5yReturnRatingAccount1 = () => $('.MuiTableBody-root').$$('tr')[0]?.$$('td')[6]?.$('h6')

// ISA
const myISAAccount2Rows = (index: number) => {
  return $('.MuiTableBody-root').$$('tr')[1]?.$$('td')[index]?.$('p')
}

export const myAccount2 = () => $('.MuiTableBody-root').$$('tr')[1]?.$('h6')
export const myInvestmentAccount2 = () => myISAAccount2Rows(1)
export const myCashAccount2 = () => myISAAccount2Rows(2)
export const myTotalValue2 = () => myISAAccount2Rows(3)
export const myLifeTimeReturn2 = () => myISAAccount2Rows(4)
export const myAnnualisedReturn2 = () => myISAAccount2Rows(5)
export const myLast5yReturn2 = () => myISAAccount2Rows(6)
export const myLast5yReturnRatingAccount2 = () => $('.MuiTableBody-root').$$('tr')[1]?.$$('td')[6]?.$('h6')

// SIPP
const mySIPPAccount3Rows = (index: number) => {
  return $('.MuiTableBody-root').$$('tr')[2]?.$$('td')[index]?.$('p')
}

export const myAccount3 = () => $('.MuiTableBody-root').$$('tr')[2]?.$('h6')
export const myInvestmentAccount3 = () => mySIPPAccount3Rows(1)
export const myCashAccount3 = () => mySIPPAccount3Rows(2)
export const myTotalValue3 = () => mySIPPAccount3Rows(3)
export const myLifeTimeReturn3 = () => mySIPPAccount3Rows(4)
export const myAnnualisedReturn3 = () => mySIPPAccount3Rows(5)
export const myLast5yReturn3 = () => mySIPPAccount3Rows(6)
export const myLast5yReturnRatingAccount3 = () => $('.MuiTableBody-root').$$('tr')[2]?.$$('td')[6]?.$('h6')

// #endregion

// cards
// #region linked accounts
// header
const lLinkAccounts = (index: number) => {
  const tableIndex = `[${index}]`
  return $(`//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][3]//tbody/tr${tableIndex}//h6`)
}

const lLinkAcc = (index: number) => {
  const itemIndex = `[${index}]`
  return $(`//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]${itemIndex}/div//div/div/div//div/div`)
}

const lAccountRows = (index1: number, index2: number) => {
  const tableIndex1 = `[${index1}]`
  const tableIndex2 = `[${index2}]`
  return $(
    `//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][3]//tbody//tr${tableIndex1}//td${tableIndex2}`
  ).$('p')
}

export const lHeader = () => acctHeader(3)
export const lLinkAnAcct = () => lLinkAcc(3)
export const lAccountTableHeader = () => tableHeader(3, 0)
export const lInvestmentsTableHeader = () => tableHeader(3, 1)
export const lCashTableHeader = () => tableHeader(3, 2)
export const lTotaValueTableHeader = () => tableHeader(3, 3)
export const lLifeTimeReturnTableHeader = () => tableHeader(3, 4)
export const lAnnulisedTableHeader = () => tableHeader(3, 5)
export const lLast5yReturnTableHeader = () => tableHeader(3, 6)

// account 1
export const lAccount1 = () => lLinkAccounts(1)
export const lGIAInvestments = () => lAccountRows(1, 2)
export const lGIACash = () => lAccountRows(1, 3)
export const lGIATotalValue = () => lAccountRows(1, 4)
export const lGIALifeTimeReturn = () => lAccountRows(1, 5)
export const lGIAAnnulisedReturn = () => lAccountRows(1, 6)
export const lGIALast5yReturn = () => lAccountRows(1, 7)

// account 2
export const lAccount2 = () => lLinkAccounts(2)
export const lISAInvestments = () => lAccountRows(2, 2)
export const lISACash = () => lAccountRows(2, 3)
export const lISATotalValue = () => lAccountRows(2, 4)
export const lISALifeTimeReturn = () => lAccountRows(2, 5)
export const lISAAnnulisedReturn = () => lAccountRows(2, 6)
export const lISALast5yReturn = () => lAccountRows(2, 7)

// #endregion

// card
// #region performance chart

const pChartItemsTitles = (titleIndex: number) => {
  const tableIndex1 = `[${titleIndex}]`
  return $(
    `//*[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][4]//div//div[2]/div/div/div/div/*/div${tableIndex1}/div/h6`
  )
}

const pChartItemsValues = (itemIndex: number) => {
  const tableIndex1 = `[${itemIndex}]`
  return $(
    `//*[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][4]//div//div[2]/div/div/div/div/*/div${tableIndex1}/*/div/div/h6`
  )
}

const pChartItemsRatings = () =>
  $('//*[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][4]//div//div[2]/div/div/div/div/*/div/*/div/div/div')

export const pHeader = () => $('//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"][4]//h4')

export const pTotalValueTitle = () => pChartItemsTitles(1)
export const pTotalValue = () => pChartItemsValues(1)
export const pNetContributionTitle = () => pChartItemsTitles(2)
export const pNetContributionValue = () => pChartItemsValues(2)
export const pLifeTimeReturnTitle = () => pChartItemsTitles(3)
export const pLifeTimeReturnValue = () => pChartItemsValues(3)
export const pLifeTimeReturnRating = () => pChartItemsRatings()

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
export const pChartLineTotalValue = () => $('.visx-group .visx-group > .visx-linepath[stroke-width="4"]')
export const pChartLineNetContributed = () => $('.visx-group .visx-group > .visx-linepath[stroke-width="2"]')

// marker line
export const pChartMarkerLine = () => $('svg >.visx-group:nth-of-type(1) > .visx-group:nth-of-type(5) > .visx-line')
export const pChartMarkerCircleTotalValue = () =>
  $('.visx-group .visx-group > .visx-circle[pointer-events="none"]:nth-of-type(1)')
export const pChartMarkerCircleNetContributed = () =>
  $('.visx-group .visx-group > .visx-circle[pointer-events="none"]:nth-of-type(2)')
// #endregion

// url
export const investmentUrl = url + '/accounts'
