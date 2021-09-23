import {
  headingTotalLabel,
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
  annualisedTitle,
  annualisedTooltip,
  annualisedValue,
} from '../components/investment/investment.locators'
import { checkChartPeriodIs5years } from '../components/investment/investment.actions'
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
    it('should load headers', async () => {
      // assert
      await checkTextContains(headingTotalLabel, 'Total Value:')
      await checkTextContains(headingTotalLabel, '£811,546')
      await checkChartPeriodIs5years()
    })
  })

  describe('Summary card scenarios', () => {
    it('should load net contribution', async () => {
      //todo remove this when net contribution is not 0 on first load
      await browser.refresh()

      // assert
      await checkTextEquals(netContributionTitle, 'NET CONTRIBUTION')
      await checkTitle(
        netContributionTooltip,
        'Your total contributions minus any withdrawals you may have made.'
      )
      await checkTextContains(netContributionValue, '£')
    })

    it('should load lifetime return', async () => {
      // assert
      await checkTextEquals(lifetimeReturnTitle, 'LIFETIME RETURN')
      await checkTitle(
        lifetimeReturnTooltip,
        'This shows how well your investments have performed since you first held them with Bestinvest. It includes returns from both growth and income, minus any fees.'
      )
      await checkTextContains(lifetimeReturnValue, '£')
      await checkTextContains(lifetimeReturnRating, '%')
    })

    it('should load annualised return', async () => {
      // assert
      await checkTextEquals(annualisedTitle, 'ANNUALISED RETURN')
      await checkTitle(
        annualisedTooltip,
        'This shows the average return per year on each pound over the period it has been invested. So for example, a figure of 5% would mean that on average, every pound you have invested has grown by 5p per year. This is also known as the "money-weighted rate of return".'
      )
      await checkTextContains(annualisedValue, '%')
    })

    it('should load last <chartPeriod> return', async () => {
      // assert
      await checkTextEquals(lastPeriodReturnTitle, "LAST 5 YEAR'S RETURN")
      await checkTitle(
        lastPeriodReturnTooltip,
        "The profit or loss you in the last 5 year's, minus any fees."
      )
      await checkTextContains(lastPeriodReturnValue, '£')
      await checkTextContains(lastPeriodReturnRating, '%')
    })
  })
})
