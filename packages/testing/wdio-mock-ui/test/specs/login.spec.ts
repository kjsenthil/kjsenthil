
import { expect } from 'chai'
import { open } from '../components/browser/browser.actions'
import { loginAction, getAlertMsgTxt, pinLoginAction } from '../components/login/login.actions'
import { getPageHeading, logout } from '../components/myaccount/myaccount.actions'
import { url, loginApiUrl, pinApiUrl, accountsApiUrl, investmentSummaryApiUrl, performanceAccountsAggregatedApiUrl } from '../environments/stage'
import { Mock } from 'webdriverio';
import loginMockResponse from '../fixtures/login'
import loginErrorMockResponse from '../fixtures/loginError'
import pinMockResponse from '../fixtures/pin'
import accountsMockResponse from '../fixtures/accounts'
import investmentSummaryMockResponse from '../fixtures/investmentSummary'
import performanceAccountsAggregatedMockResponse from '../fixtures/performanceAccountsAggregated'

describe("Login test scenarios", () => {

  let login: Mock
  let pin: Mock
  let accounts: Mock
  let investmentSummary: Mock
  let performanceAccountsAggregated: Mock

  describe('successful login scenarios', async () => {
    //Arrange
    before(async () => {
      const statusCode = {
        statusCode: 200,
      };
      login = await browser.mock(
        loginApiUrl,
        {
          method: "post"
        }
      );
      await login.respond(loginMockResponse, statusCode);
  
      pin = await browser.mock(
        pinApiUrl,
        {
          method: "post",
        }
      );
      await pin.respond(pinMockResponse, statusCode);
  
      accounts = await browser.mock(
        accountsApiUrl,
        {
          method: "get",
          headers: { 'Authorization': `Bearer ${process.env.accessToken}` },
        }
      );
      await accounts.respond(accountsMockResponse, statusCode);
  
      investmentSummary = await browser.mock(
        investmentSummaryApiUrl,
        {
          method: "get",
          headers: { 'Authorization': `Bearer ${process.env.accessToken}` },
        }
      );
      await investmentSummary.respond(investmentSummaryMockResponse, statusCode);

      performanceAccountsAggregated = await browser.mock(
        performanceAccountsAggregatedApiUrl,
        {
          method: "get",
          headers: { 'Authorization': `Bearer ${process.env.accessToken}` },
        }
      );
      await performanceAccountsAggregated.respond(performanceAccountsAggregatedMockResponse, statusCode);
    });

    after(async ()=>{
      await login.restore()
      await pin.restore()
      await accounts.restore()
      await investmentSummary.restore()
      await performanceAccountsAggregated.restore()
    })

    it("should login with valid credentials", async () => {    
      //Act
      await open(url)
      await loginAction("test", "test")
      //Assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Success'
      expect(alertMsg).to.equal(expectedAlertMsg);
      await pinLoginAction()
      const pageHeading = await getPageHeading();
      const expectedPageHeading = 'Hi FirstName'
      expect(pageHeading).to.contain(expectedPageHeading);
      await logout();
    });
  })

  describe('unsuccessful login scenarios', () => {
    //Arrange
    beforeEach( async () => {
      const statusCode = {
        statusCode: 404,
      };
  
      login = await browser.mock(
        loginApiUrl,
        {
          method: "post"
        }
      );
      await login.respond(loginErrorMockResponse, statusCode);
    });

    after(async ()=>{
      await login.restore()
    })

    it("should not login with invalid username", async () => {   
      //Act 
      await open(url)
      await loginAction("invalid username", "valid password")
      //Assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Request failed with status code 404'
      expect(alertMsg).to.equal(expectedAlertMsg);
    });
  
    it("should not login with invalid password", async () => { 
      //Act   
      await open(url)
      await loginAction("valid username", "invalid password")
      //Assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Request failed with status code 404'
      expect(alertMsg).to.equal(expectedAlertMsg);
    });
  
    it("should not login with invalid username and password", async () => {    
      //Act
      await open(url)
      await loginAction("invalid username", "invalid password")
      //Assert
      const alertMsg = await getAlertMsgTxt()
      const expectedAlertMsg = 'Request failed with status code 404'
      expect(alertMsg).to.equal(expectedAlertMsg);
    });
  })
});
