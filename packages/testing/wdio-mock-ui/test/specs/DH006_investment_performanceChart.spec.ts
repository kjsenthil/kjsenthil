import {
  pLifeTimeReturnTitle,
  pTotalValueTitle,
  pTotalValue,
  pLifeTimeReturnValue,
  pLifeTimeReturnRating,
  pNetContributionTitle,
  pNetContributionValue,
  pHeader,
  pChartXLevel1,
  pChartXLevel2,
  pChartXLevel3,
  pChartXLevel4,
  pChartYLevel1,
  pChartYLevel2,
  pChartYLevel3,
  pChartYLevel4,
  pChartMarkerCircleNetContributed,
  pChartMarkerCircleTotalValue,
  pChartMarkerLine,
  pChartYLevel5,
} from '../components/investment/investment.locators'
import accountsMockResponse from '../fixtures/accounts'
import investmentSummaryMockResponse from '../fixtures/investmentSummary'
import loginMockResponse from '../fixtures/login'
import performanceAccountsAggregatedMockResponse from '../fixtures/performanceAccountsAggregated'
import pinMockResponse from '../fixtures/pin'
import {
  accountsApiUrl,
  investmentSummaryApiUrl,
  loginApiUrl,
  performanceAccountsAggregatedApiUrl,
  pinApiUrl,
} from '../environments/env'
import { Mock } from 'webdriverio'
import { performLogin } from '../components/login/login.actions'
import { checkTextContains, checkTextEquals, scrollToElement } from '../utils/genericActions'
import { expect } from 'chai'

describe('Investment page scenarios', () => {
  // arrange
  let accounts: Mock
  let investmentSummary: Mock
  let login: Mock
  let performanceAccountsAggregated: Mock
  let pin: Mock

  before(async () => {
    const statusCode = {
      statusCode: 200,
    }

    login = await browser.mock(loginApiUrl, {
      method: 'post',
    })
    await login.respond(loginMockResponse, statusCode)

    pin = await browser.mock(pinApiUrl, {
      method: 'post',
    })
    await pin.respond(pinMockResponse, statusCode)

    accounts = await browser.mock(accountsApiUrl, {
      method: 'get',
      headers: { Authorization: `Bearer ${process.env.accessToken}` },
    })
    await accounts.respond(accountsMockResponse, statusCode)

    investmentSummary = await browser.mock(investmentSummaryApiUrl, {
      method: 'get',
      headers: { Authorization: `Bearer ${process.env.accessToken}` },
    })
    await investmentSummary.respond(investmentSummaryMockResponse, statusCode)

    performanceAccountsAggregated = await browser.mock(performanceAccountsAggregatedApiUrl, {
      method: 'get',
      headers: { Authorization: `Bearer ${process.env.accessToken}` },
    })
    await performanceAccountsAggregated.respond(
      performanceAccountsAggregatedMockResponse,
      statusCode
    )

    await performLogin('test', 'test')
  })

  afterEach(async () => {
    await browser.pause(500)
  })

  after(async () => {
    await accounts.restore()
    await investmentSummary.restore()
    await login.restore()
    await performanceAccountsAggregated.restore()
    await pin.restore()
  })

  describe('Performance chart card scenarios', () => {
    it('should load header', async () => {
      // assert
      await checkTextEquals(pHeader, 'Performance chart')
      await checkTextEquals(pTotalValueTitle, 'TOTAL VALUE')
      await checkTextContains(pTotalValue, '£')
      await checkTextEquals(pNetContributionTitle, 'NET CONTRIBUTION')
      await checkTextContains(pNetContributionValue, '£')
      await checkTextEquals(pLifeTimeReturnTitle, 'LIFETIME RETURN')
      await checkTextContains(pLifeTimeReturnValue, '£')
      await checkTextContains(pLifeTimeReturnRating, '%')
    })

    it('should load X axis legend', async () => {
      // assert
      await scrollToElement(await pChartXLevel1())
      await checkTextEquals(pChartXLevel1, '£200k')
      await checkTextEquals(pChartXLevel2, '£400k')
      await checkTextEquals(pChartXLevel3, '£600k')
      await checkTextEquals(pChartXLevel4, '£800k')
    })

    it('should load Y axis legend', async () => {
      // assert
      await scrollToElement(await pChartYLevel1())
      await checkTextEquals(pChartYLevel1, '2017')
      await checkTextEquals(pChartYLevel2, '2018')
      await checkTextEquals(pChartYLevel3, '2019')
      await checkTextEquals(pChartYLevel4, '2020')
      await checkTextEquals(pChartYLevel5, '2021')
    })

    it('should load marker components', async () => {
      // assert
      await scrollToElement(await pChartYLevel1())
      expect(await (await pChartMarkerLine()).waitForExist()).to.be.true
      expect(await (await pChartMarkerCircleTotalValue()).waitForExist()).to.be.true
      expect(await (await pChartMarkerCircleNetContributed()).waitForExist()).to.be.true
    })
  })
})
