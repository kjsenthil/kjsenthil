import {
  headingUserLabel,
  headingTitleLabel,
  headingTotalLabel,
  totalTitle,
  totalTooltip,
  totalValue,
  netContributionTitle,
  netContributionTooltip,
  netContributionValue,
  lifetimeReturnTitle,
  lifetimeReturnTooltip,
  lifetimeReturnValue,
  lifetimeReturnRating,
  lastPeriodReturnTitle,
  lastPeriodReturnTooltip,
  lastPeriodReturnValue,
  lastPeriodReturnRating,
} from '../components/investment/investment.locators'
import { checkChartPeriodIs, Period } from '../components/investment/investment.actions'
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
} from '../environments/stage'
import { Mock } from 'webdriverio'
import { performLogin } from '../components/login/login.actions'
import { checkTextContains, checkTextEquals, checkTitle } from '../utils/genericActions'

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

  describe('Header scenarios', () => {
    it('should load text for the headers', async () => {
      // assert
      await checkTextEquals(headingTitleLabel, "FirstName's")
      await checkTextEquals(headingUserLabel, 'Investments')
      await checkTextContains(headingTotalLabel, 'Total Value:')
      await checkTextContains(headingTotalLabel, '£811,546')
      await checkChartPeriodIs(Period.FiveYears)
    })
  })

  describe('Summary card scenarios', () => {
    it('should load totals', async () => {
      //todo remove this when last 5 years return is not 0 on first load: https://tilneygroup.atlassian.net/browse/DH-721
      await browser.refresh()
      // assert
      await checkTextEquals(totalTitle, 'TOTAL VALUE')
      await checkTitle(totalTooltip, 'Total value = Investments plus cash')
      await checkTextEquals(totalValue, '£811,546')
    })

    it('should load contributions', async () => {
      // assert
      await checkTextEquals(netContributionTitle, 'NET CONTRIBUTIONS')
      await checkTitle(netContributionTooltip, 'Contributions minus withdrawals')
      await checkTextEquals(netContributionValue, '-£203,219')
    })

    it('should load lifetime return', async () => {
      // assert
      await checkTextEquals(lifetimeReturnTitle, 'LIFETIME RETURN')
      await checkTitle(
        lifetimeReturnTooltip,
        'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.'
      )
      await checkTextEquals(lifetimeReturnValue, '+ £99,820')
      await checkTextEquals(lifetimeReturnRating, '+ 1,083.0%')
    })

    it('should load last <chartPeriod> return', async () => {
      // assert
      await checkTextEquals(lastPeriodReturnTitle, 'LAST 5 YEARS RETURN')
      await checkTitle(
        lastPeriodReturnTooltip,
        'Return figure relates to the gain or loss over the specified period including the impact of fees'
      )
      await checkTextEquals(lastPeriodReturnValue, '+ £367,325')
      await checkTextEquals(lastPeriodReturnRating, '+ 56.4%')
    })
  })
})
