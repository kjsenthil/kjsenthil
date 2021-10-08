import {
  lHeader,
  lTotaValueTableHeader,
  lLifeTimeReturnTableHeader,
  lAnnulisedTableHeader,
  lLast5yReturnTableHeader,
  lGIAInvestments,
  lGIATotalValue,
  lGIALifeTimeReturn,
  lGIAAnnulisedReturn,
  lGIALast5yReturn,
  lISAInvestments,
  lISACash,
  lISATotalValue,
  lISALifeTimeReturn,
  lISAAnnulisedReturn,
  lISALast5yReturn,
  lGIACash,
  lLinkAnAcct,
  lAccountTableHeader,
  lCashTableHeader,
  lInvestmentsTableHeader,
  lAccount1,
  lAccount2,
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

  describe('Linked accounts card scenarios', () => {
    it('should load header', async () => {
      // assert
      await checkTextEquals(lHeader, 'Linked accounts')
      await checkTitle(lLinkAnAcct, `Coming soon`)
      await checkTextEquals(lAccountTableHeader, 'ACCOUNT')
      await checkTextEquals(lInvestmentsTableHeader, 'INVESTMENTS')
      await checkTextEquals(lCashTableHeader, 'CASH')
      await checkTextEquals(lTotaValueTableHeader, `TOTAL VALUE`)
      await checkTextEquals(lLifeTimeReturnTableHeader, `LIFETIME RETURN`)
      await checkTextEquals(lAnnulisedTableHeader, `ANNUALISED RETURN`)
      await checkTextEquals(lLast5yReturnTableHeader, `LAST 5 YEARS' RETURN`)
    })

    it('should load data for account 1', async () => {
      // assert
      await checkTextEquals(lAccount1, `GIA`)
      await checkTextContains(lGIAInvestments, `£`)
      await checkTextContains(lGIACash, `£`)
      await checkTextContains(lGIATotalValue, `£`)
      await checkTextContains(lGIALifeTimeReturn, `£`)
      await checkTextContains(lGIAAnnulisedReturn, `%`)
      await checkTextContains(lGIALast5yReturn, `£`)
    })

    it('should load data for account 2', async () => {
      // assert
      await checkTextEquals(lAccount2, 'ISA')
      await checkTextContains(lISAInvestments, `£`)
      await checkTextContains(lISACash, `£`)
      await checkTextContains(lISATotalValue, `£`)
      await checkTextContains(lISALifeTimeReturn, `£`)
      await checkTextContains(lISAAnnulisedReturn, `%`)
      await checkTextContains(lISALast5yReturn, `£`)
    })
  })
})
