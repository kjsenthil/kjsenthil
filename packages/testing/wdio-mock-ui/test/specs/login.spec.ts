import { expect } from 'chai'
import { open } from '../components/browser/browser.actions'
import { loginAction, getAlertMsgTxt, pinLoginAction } from '../components/login/login.actions'
import { getPageHeading, logOut } from '../components/myAccounts/myAccounts.actions'
import {
  url,
  loginApiUrl,
  accountsApiUrl,
  investmentSummaryApiUrl,
  performanceAccountsAggregatedApiUrl,
  pinApiUrl,
} from '../environments/stage'
import { Mock } from 'webdriverio'
import accountsMockResponse from '../fixtures/accounts'
import investmentSummaryMockResponse from '../fixtures/investmentSummary'
import loginMockResponse from '../fixtures/login'
import performanceAccountsAggregatedMockResponse from '../fixtures/performanceAccountsAggregated'
import pinMockResponse from '../fixtures/pin'
import loginErrorMockResponse from '../fixtures/loginError'

describe('Login test scenarios', () => {
  let accounts: Mock
  let login: Mock
  let investmentSummary: Mock
  let performanceAccountsAggregated: Mock
  let pin: Mock

  describe('successful login scenarios', async () => {
    // arrange
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
    })

    after(async () => {
      await login.restore()
      await pin.restore()
      await accounts.restore()
      await investmentSummary.restore()
      await performanceAccountsAggregated.restore()
    })

    it('should login with valid credentials', async () => {
      // act
      await open(url)
      await loginAction('test', 'test')
      // assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Success'
      expect(alertMsg).to.equal(expectedAlertMsg)
      await pinLoginAction()
      const pageHeading = await getPageHeading()
      const expectedPageHeading = "FirstName's\nInvestments"
      expect(pageHeading).to.contain(expectedPageHeading)
      await logOut()
    })
  })

  describe('unsuccessful login scenarios', () => {
    // arrange
    let login: Mock

    beforeEach(async () => {
      const statusCode = {
        statusCode: 404,
      }

      login = await browser.mock(loginApiUrl, {
        method: 'post',
      })
      await login.respond(loginErrorMockResponse, statusCode)
    })

    after(async () => {
      await login.restore()
    })

    it('should not login with invalid username', async () => {
      // act
      await open(url)
      await loginAction('invalid username', 'valid password')
      // assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Incorrect username or password'
      expect(alertMsg).to.equal(expectedAlertMsg)
    })

    it('should not login with invalid password', async () => {
      // act
      await open(url)
      await loginAction('valid username', 'invalid password')
      // assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Incorrect username or password'
      expect(alertMsg).to.equal(expectedAlertMsg)
    })

    it('should not login with invalid username and password', async () => {
      // act
      await open(url)
      await loginAction('invalid username', 'invalid password')
      // assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Incorrect username or password'
      expect(alertMsg).to.equal(expectedAlertMsg)
    })
  })
})
