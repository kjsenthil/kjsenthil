import { expect } from 'chai'
import { Mock } from 'webdriverio'
import {
  addCashBtn,
  investmentMenuBtn,
  investmentMenuLabel,
  investBtn,
  lifePlanMenuBtn,
  logoBtn,
  myAccountsLoginBtn,
  myAccountsLoginText,
} from '../components/header/header.locators'
import {
  bottomNoteLabel,
  cookiePolicy,
  infoLabel,
  websiteConditions,
  riskWarnings,
  pastPerformanceParagraph,
  privacyNotice,
  accessibility,
  keepingYourAccountSecure,
} from '../components/footer/footer.locators'
import { lHeader } from '../components/investment/investment.locators'
import { performLogin } from '../components/login/login.actions'
import {
  accountsApiUrl,
  investmentSummaryApiUrl,
  loginApiUrl,
  performanceAccountsAggregatedApiUrl,
  pinApiUrl,
} from '../environments/env'
import loginMockResponse from '../fixtures/login'
import pinMockResponse from '../fixtures/pin'
import accountsMockResponse from '../fixtures/accounts'
import investmentSummaryMockResponse from '../fixtures/investmentSummary'
import performanceAccountsAggregatedMockResponse from '../fixtures/performanceAccountsAggregated'

describe('Check common elements from header, footer area', () => {
  let accounts: Mock
  let investmentSummary: Mock
  let login: Mock
  let performanceAccountsAggregated: Mock
  let pin: Mock

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

    await performLogin('test', 'test')
  })

  afterEach(async () => {
    await browser.pause(500)
  })

  after(async () => {
    await login.restore()
    await pin.restore()
    await accounts.restore()
    await investmentSummary.restore()
    await performanceAccountsAggregated.restore()
  })

  describe('Header scenarios', () => {
    it('should load header links', async () => {
      // assert
      const elemLogoBtn = expect(await (await logoBtn()).waitForClickable(), 'No match found').to.be
        .true
      console.info('Logo is displayed:', elemLogoBtn)

      // act
      const textInvestmentBtn = await (await investmentMenuLabel()).getText()
      console.info('"Investment" menu is displayed:', textInvestmentBtn)
      // assert
      expect(textInvestmentBtn).to.equal('Investments', 'No match found')

      // act
      await (await investmentMenuBtn()).waitForClickable()
      await (await investmentMenuBtn()).click()
      await (await lHeader()).waitForDisplayed({ timeout: 25000 })
      // assert
      let currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      expect(
        new RegExp(`https?:\/\/.(.*)?\/?(.*)\/?(.*).net/my-account`).test(currentUrl),
        'URL does not match'
      ).true

      // act
      const textLifePlanBtn = await (await lifePlanMenuBtn()).getText()
      console.info('"Life plan" menu is displayed:', textLifePlanBtn)
      // assert
      expect(textLifePlanBtn).to.equal('Life plan', 'No match found')

      // act
      await (await lifePlanMenuBtn()).waitForClickable()
      await (await lifePlanMenuBtn()).click()
      currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      // assert
      expect(
        new RegExp(`https?:\/\/.(.*)?\/?(.*)\/?(.*).net/my-account/life-plan`).test(currentUrl),
        'URL does not match'
      ).true
      expect(await (await logoBtn()).waitForClickable()).to.equal(true, 'No match found')

      // act
      await (await logoBtn()).click()
      currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      // assert
      expect(
        new RegExp(`https?:\/\/.(.*)?\/?(.*)\/?(.*).net/my-account`).test(currentUrl),
        'URL does not match'
      ).true

      // assert
      expect(await (await addCashBtn()).waitForDisplayed()).to.be.true

      // assert
      expect(await (await investBtn()).waitForDisplayed()).to.be.true

      // assert
      expect(await (await myAccountsLoginText()).waitForClickable()).to.be.true
      const textMyAccountsLogin = await (await myAccountsLoginText()).getText()
      expect(textMyAccountsLogin).to.equal('My Accounts Login', 'No match found')
      const hrefMyAccountsLogin = await (await myAccountsLoginBtn()).getAttribute('href')
      console.info('href:', hrefMyAccountsLogin)
      expect(hrefMyAccountsLogin).to.equal(
        'https://my.demo2.bestinvest.co.uk/dashboard',
        'No match found'
      )
    })
  })

  describe('Footer scenarios', () => {
    it('should load footer links', async () => {
      // assert
      const infoText = await (await infoLabel()).getText()
      console.info('H6 text is displayed:', infoText)
      expect(infoText).to.equal(
        'The value of your investment can go down as well as up, and you can get back less than your originally invested.',
        'No match found'
      )

      // assert
      const pastPerformanceText = await (await pastPerformanceParagraph()).getText()
      console.info('Paragraph text is displayed:', pastPerformanceText)
      expect(pastPerformanceText).to.equal(
        'Past performance or any yields quoted should not be considered reliable indicators of future returns. Restricted advice can be provided as part of other services offered by Bestinvest, upon request and on a fee basis. Before investing in funds please check the specific risk factors on the key features document or refer to our risk warning notice as some funds can be high risk or complex; they may also have risks relating to the geographical area, industry sector and/or underlying assets in which they invest. Tax legislation is that prevailing at the time, is subject to change without notice and depends on individual circumstances. Clients should always seek appropriate tax advice before making decisions.',
        'No match found'
      )

      // assert
      const websiteConditionsText = await (await accessibility()).getText()
      console.info('Paragraph text is displayed:', websiteConditionsText)
      expect(websiteConditionsText).to.equal('Accessibility', 'No match found')

      // assert
      const cookiePolicyText = await (await cookiePolicy()).getText()
      console.info('Paragraph text is displayed:', cookiePolicyText)
      expect(cookiePolicyText).to.equal('Cookie Policy', 'No match found')

      // assert
      const keyFactsAndTermsText = await (await websiteConditions()).getText()
      console.info('Paragraph text is displayed:', keyFactsAndTermsText)
      expect(keyFactsAndTermsText).to.equal('Website conditions', 'No match found')

      // assert
      const riskWarningsText = await (await privacyNotice()).getText()
      console.info('Paragraph text is displayed:', riskWarningsText)
      expect(riskWarningsText).to.equal('Privacy notice', 'No match found')

      // assert
      const ourRegisteredDetailsText = await (await riskWarnings()).getText()
      console.info('Paragraph text is displayed:', ourRegisteredDetailsText)
      expect(ourRegisteredDetailsText).to.equal('Risk Warnings', 'No match found')

      // assert
      const keepingYourAccountSecureText = await (await keepingYourAccountSecure()).getText()
      console.info('Paragraph text is displayed:', keepingYourAccountSecureText)
      expect(keepingYourAccountSecureText).to.equal('Keeping your account secure', 'No match found')

      // assert
      const bottomNoteText = await (await bottomNoteLabel()).getText()
      console.info('Paragraph text is displayed:', bottomNoteText)
      expect(bottomNoteText).to.equal(
        'Issued by Tilney Investment Management Services Limited, (Reg. No: 2830297). Authorised and regulated by the Financial Conduct Authority. Financial services are provided by Tilney Investment Management Services Limited and other companies in the Tilney Smith & Williamson Group, further details of which are available here. This site is for UK investors only. © Tilney Smith & Williamson Limited 2021.',
        'No match found'
      )
    })
  })
})
