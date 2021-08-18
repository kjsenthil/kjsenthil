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
  const locator = $('.fKhQRz > button:nth-child(' + index + ')')
  return locator
}

export const checkChartPeriodIs = async (period: Period) => {
  expect(await (await chartPeriodSwitch()).waitForClickable()).to.be.true
  const element = await getChartPeriodOptionLocator(period)
  expect(await element.waitForClickable()).to.be.true
  const attribute = await element.getAttribute('class')
  return expect(attribute).to.contain('cjTDOR')
}

export const setChartPeriodTo = async (period: Period) => {
  const element = await getChartPeriodOptionLocator(period)
  expect(await element.waitForClickable()).to.be.true
  await element.click()
  const attribute = await element.getAttribute('class')
  return expect(attribute).to.contain('cjTDOR')
}
