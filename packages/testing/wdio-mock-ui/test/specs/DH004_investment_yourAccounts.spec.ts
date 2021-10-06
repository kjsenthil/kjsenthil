import {
  myAccountHeader,
  myOpenAnAcc,
  myAccountTableHeader,
  myInvestmentsTableHeader,
  myCashTableHeader,
  myTotaValueTableHeader,
  myLifeTimeHeader,
  myAnnulisedTableHeader,
  myLast5yReturnTableHeader,
  InvestmentsToolTip,
  TotalValueTooltip,
  LifetimeReturnTooltip,
  AnnualisedReturnTooltip,
  Last5yReturnTooltip,
  myInvestmentAccount1,
  myTotalValue,
  myLifeTimeReturn,
  myAnnualisedReturn,
  myLast5yReturn,
  myLast5yReturnRatingAccount1,
  myAccount1,
  myCashAccount1,
  myInvestmentAccount2,
  myAccount2,
  myCashAccount2,
  myTotalValue2,
  myLifeTimeReturn2,
  myAnnualisedReturn2,
  myLast5yReturn2,
  myLast5yReturnRatingAccount2,
  myTotalValue3,
  myInvestmentAccount3,
  myLifeTimeReturn3,
  myAnnualisedReturn3,
  myLast5yReturn3,
  myLast5yReturnRatingAccount3,
  myAccount3,
  myCashAccount3,
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
import { checkTextEquals, checkTitle, checkTextContains } from '../utils/genericActions'

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

  describe('Your accounts card scenarios', () => {
    it('should load header', async () => {
      // assert
      await checkTextEquals(myAccountHeader, `My accounts`)
      await checkTitle(myOpenAnAcc, `Coming soon`)
      await checkTextEquals(myAccountTableHeader, `ACCOUNT`)
      await checkTextEquals(myInvestmentsTableHeader, `INVESTMENTS`)
      await checkTextEquals(myCashTableHeader, `CASH`)
      await checkTextEquals(myTotaValueTableHeader, `TOTAL VALUE`)
      await checkTextEquals(myLifeTimeHeader, `LIFETIME RETURN`)
      await checkTextEquals(myAnnulisedTableHeader, `ANNUALISED RETURN`)
      await checkTextEquals(myLast5yReturnTableHeader, `LAST 5 YEAR'S RETURN`)
      await checkTitle(InvestmentsToolTip, `The total current value of your investments.`)
      await checkTitle(TotalValueTooltip, `The total value of your investments and cash.`)
      await checkTitle(
        LifetimeReturnTooltip,
        `This shows how well your investments have performed since you first held them with Bestinvest. It includes returns from both growth and income, minus any fees.`
      )
      await checkTitle(
        AnnualisedReturnTooltip,
        `This shows the average return per year on each pound over the period it has been invested. So for example, a figure of 5% would mean that on average, every pound you have invested has grown by 5p per year. This is also known as the "money-weighted rate of return".`
      )
      await checkTitle(
        Last5yReturnTooltip,
        `The profit or loss you in the last 5 year's, minus any fees.`
      )
    })

    it('should load data for account 1', async () => {
      // assert
      await checkTextEquals(myAccount1, 'GIA')
      await checkTextContains(myInvestmentAccount1, '£')
      await checkTextContains(myCashAccount1, '£')
      await checkTextContains(myTotalValue, '£')
      await checkTextContains(myLifeTimeReturn, '£')
      await checkTextContains(myAnnualisedReturn, '%')
      await checkTextContains(myLast5yReturn, '£')
      await checkTextContains(myLast5yReturnRatingAccount1, '%')
    })

    it('should load data for account 2', async () => {
      // assert
      await checkTextEquals(myAccount2, 'ISA')
      await checkTextContains(myInvestmentAccount2, '£')
      await checkTextContains(myCashAccount2, '£')
      await checkTextContains(myTotalValue2, '£')
      await checkTextContains(myLifeTimeReturn2, '£')
      await checkTextContains(myAnnualisedReturn2, '%')
      await checkTextContains(myLast5yReturn2, '£')
      await checkTextContains(myLast5yReturnRatingAccount2, '%')
    })

    it('should load data for account 3', async () => {
      // assert
      await checkTextEquals(myAccount3, 'SIPP')
      await checkTextEquals(myInvestmentAccount3, '£')
      await checkTextEquals(myCashAccount3, '£')
      await checkTextEquals(myTotalValue3, '£')
      await checkTextEquals(myLifeTimeReturn3, '£')
      await checkTextEquals(myAnnualisedReturn3, '%')
      await checkTextEquals(myLast5yReturn3, '£')
      await checkTextEquals(myLast5yReturnRatingAccount3, '%')
    })
  })
})
