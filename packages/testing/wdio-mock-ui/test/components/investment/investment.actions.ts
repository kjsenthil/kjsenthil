import { expect } from 'chai'
import { chartPeriodSwitch } from './investment.locators'

// chart period options
export enum Period {
  OneWeek = '1w',
  OneMonth = '1m',
  ThreeMonths = '3m',
  SixMonths = '6m',
  OneYear = '1y',
  FiveYears = '5y',
}

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
  return $('[data-testid="chart period selection"] button:nth-child(' + index + ')')
}

export const checkChartPeriodIs5years = async () => {
  expect(await (await chartPeriodSwitch()).waitForClickable()).to.be.true
  const element = await getChartPeriodOptionLocator(Period.FiveYears)
  expect(await element.waitForClickable()).to.be.true
  const value = await element.getAttribute('class')
  const subString1 = value.substring(80, 86)
  const secondElement = await getChartPeriodOptionLocator(Period.OneWeek)
  const value2 = await secondElement.getAttribute('class')
  const subString2 = value2.substring(80, 86)
  const thirdElement = await getChartPeriodOptionLocator(Period.OneMonth)
  const value3 = await thirdElement.getAttribute('class')
  const subString3 = value3.substring(80, 86)
  console.log('Class id: ', subString1)
  console.log('Class id: ', subString2)
  console.log('Class id: ', subString3)
  expect(subString1).not.to.equal(subString2)
  expect(subString2).to.equal(subString3)
  return expect(subString1).not.to.equal(subString3)
}

export const setChartPeriodTo = async (period: Period) => {
  const element = await getChartPeriodOptionLocator(period)
  expect(await element.waitForClickable()).to.be.true
  await element.click()
  const attribute = await element.getAttribute('class')
  return expect(attribute).to.contain('cjTDOR')
}
