import { expect } from 'chai'
import { Mock } from 'webdriverio'
import {
  addCashBtn,
  cashToInvestAmount,
  cashToInvestLabel,
  investmentMenuBtn,
  investmentMenuLabel,
  investBtn,
  lifePlanMenuBtn,
  lifePlanMenuLabel,
  logoBtn,
  myAccountsLoginBtn,
  myAccountsLoginText,
} from '../components/header/header.locators'
import {
  bottomNoteLabel,
  cookiePolicy,
  infoLabel,
  keyFactsAndTerms,
  ourRegisteredDetails,
  pastPerformanceLabel,
  riskWarnings,
  websiteConditions,
} from '../components/footer/footer.locators'
import { lHeader } from '../components/investment/investment.locators'
import { performLogin } from '../components/login/login.actions'
import {
  accountsApiUrl,
  investmentSummaryApiUrl,
  loginApiUrl,
  performanceAccountsAggregatedApiUrl,
  pinApiUrl,
} from '../environments/stage'
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
      const elemLogoBtn = expect(
        await (await logoBtn()).waitForClickable(),
        'Expected result not matching'
      ).to.be.true
      console.info('Logo is displayed:', elemLogoBtn)

      // act
      const textInvestmentBtn = await (await investmentMenuLabel()).getText()
      console.info('"Investment" menu is displayed:', textInvestmentBtn)
      // assert
      expect(textInvestmentBtn).to.equal('Investment', 'Expected result not matching')

      // act
      await (await investmentMenuBtn()).waitForClickable()
      await (await investmentMenuBtn()).click()
      await (await lHeader()).waitForClickable()
      // assert
      let currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      expect(new RegExp('[a-z]*.azureedge.net/my-account').test(currentUrl), 'URL does not match')
        .true

      // act
      const textLifePlanBtn = await (await lifePlanMenuLabel()).getText()
      console.info('"Life plan" menu is displayed:', textLifePlanBtn)
      // assert
      expect(textLifePlanBtn).to.equal('Life plan', 'Expected result not matching')

      // act
      await (await lifePlanMenuBtn()).waitForClickable()
      await (await lifePlanMenuBtn()).click()
      currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      // assert
      expect(
        new RegExp('[a-z]*.azureedge.net/my-account/life-plan').test(currentUrl),
        'URL does not match'
      ).true
      expect(await (await logoBtn()).waitForClickable()).to.equal(
        true,
        'Expected result not matching'
      )

      // act
      await (await logoBtn()).click()
      currentUrl = await browser.getUrl()
      console.info('Current URL:', currentUrl)
      // assert
      expect(new RegExp('[a-z]*.azureedge.net/my-account').test(currentUrl), 'URL does not match')
        .true

      // assert
      // cash to invest
      const elemCashToInvestAmount = await (await cashToInvestAmount()).waitForClickable()
      console.info('MyAccountsLogin is displayed:', elemCashToInvestAmount)
      expect(elemCashToInvestAmount).to.equal(true, 'Expected result not matching')
      const elemCashToInvestLabel = await (await cashToInvestLabel()).waitForClickable()
      console.info('MyAccountsLogin is displayed:', elemCashToInvestLabel)
      expect(elemCashToInvestLabel).to.equal(true, 'Expected result not matching')

      // assert
      // addCash
      const elemAddCashBtn = await (await addCashBtn()).waitForClickable()
      console.info('MyAccountsLogin is displayed:', elemAddCashBtn)
      expect(elemAddCashBtn).to.equal(true, 'Expected result not matching')

      // assert
      // invest
      const elemInvestBtn = await (await investBtn()).waitForClickable()
      console.info('MyAccountsLogin is displayed:', elemInvestBtn)
      expect(elemInvestBtn).to.equal(true, 'Expected result not matching')

      // assert
      // ma
      const elemMyAccountsLogin = await (await myAccountsLoginText()).waitForClickable()
      console.info('MyAccountsLogin is displayed:', elemMyAccountsLogin)
      expect(elemMyAccountsLogin).to.equal(true, 'Expected result not matching')
      const textMyAccountsLogin = await (await myAccountsLoginText()).getText()
      expect(textMyAccountsLogin).to.equal('My Accounts Login', 'Expected result not matching')
      const hrefMyAccountsLogin = await (await myAccountsLoginBtn()).getAttribute('href')
      console.info('href:', hrefMyAccountsLogin)
      expect(hrefMyAccountsLogin).to.equal(
        'https://my.demo2.bestinvest.co.uk/dashboard',
        'Items do not match'
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
        'Expected result not matching'
      )

      // assert
      const pastPerformanceText = await (await pastPerformanceLabel()).getText()
      console.info('Paragraph text is displayed:', pastPerformanceText)
      expect(pastPerformanceText).to.equal(
        'Past performance or any yields quoted should not be considered reliable indicators of future returns. Restricted advice can be provided as part of other services offered by Bestinvest, upon request and on a fee basis. Before investing in funds please check the specific risk factors on the key features document or refer to our risk warning notice as some funds can be high risk or complex; they may also have risks relating to the geographical area, industry sector and/or underlying assets in which they invest. Prevailing tax rates and relief are dependent in your individual circumstances and are subject to change.',
        'Expected result not matching'
      )

      // assert
      const websiteConditionsText = await (await websiteConditions()).getText()
      console.info('Paragraph text is displayed:', websiteConditionsText)
      expect(websiteConditionsText).to.equal('Website Conditions', 'Expected result not matching')

      // assert
      const cookiePolicyText = await (await cookiePolicy()).getText()
      console.info('Paragraph text is displayed:', cookiePolicyText)
      expect(cookiePolicyText).to.equal('Cookie Policy', 'Expected result not matching')

      // assert
      const keyFactsAndTermsText = await (await keyFactsAndTerms()).getText()
      console.info('Paragraph text is displayed:', keyFactsAndTermsText)
      expect(keyFactsAndTermsText).to.equal(
        'Key Facts and terms of business',
        'Expected result not matching'
      )

      // assert
      const riskWarningsText = await (await riskWarnings()).getText()
      console.info('Paragraph text is displayed:', riskWarningsText)
      expect(riskWarningsText).to.equal('Risk Warnings', 'Expected result not matching')

      // assert
      const ourRegisteredDetailsText = await (await ourRegisteredDetails()).getText()
      console.info('Paragraph text is displayed:', ourRegisteredDetailsText)
      expect(ourRegisteredDetailsText).to.equal(
        'Our registered Details',
        'Expected result not matching'
      )

      // assert
      const bottomNoteText = await (await bottomNoteLabel()).getText()
      console.info('Paragraph text is displayed:', bottomNoteText)
      expect(bottomNoteText).to.equal(
        'The Tilney Bestinvest Group of Companies comprises the firms Bestinvest (Brokers) Ltd (Reg. No. 2830297), Tilney Investment Management (reg. No. 02010520), Bestinvest (Consultants) Ltd (Reg. No. 1550116) and HW Financial Services Ltd (Reg. No. 02030706) all of which are authorised and regulated by the Financial Conduct Authority. Registered office: 6 Chesterfield Gardens, Mayfair, W1J 5BO.',
        'Expected result not matching'
      )
    })
  })
})
