
import { expect } from 'chai'
import { open } from '../components/browser/browser.actions'
import { loginAction, getAlertMsgTxt, pinLoginAction } from '../components/login/login.actions'
import { getPageHeading, logout } from '../components/myaccount/myaccount.actions'
import { url, loginApiUrl, pinApiUrl, contributionsApiUrl, accountsApiUrl, investmentSummaryApiUrl } from '../environments/dev'
import { Mock } from 'webdriverio';
import loginMock from '../fixtures/loginMock'
import loginErrorMock from '../fixtures/loginErrorMock'
import pinMock from '../fixtures/pinMock'
import contributionsMock from '../fixtures/contributionsMock'
import accountsMock from '../fixtures/accountsMock'
import investmentSummaryMock from '../fixtures/investmentSummary'

describe("Login test scenarios", () => {

  let login: Mock
  let pin: Mock
  let contributions: Mock
  let accounts: Mock
  let investmentSummary: Mock

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
      await login.respond(loginMock, statusCode);
  
      pin = await browser.mock(
        pinApiUrl,
        {
          method: "post",
        }
      );
      await pin.respond(pinMock, statusCode);
  
      accounts = await browser.mock(
        accountsApiUrl,
        {
          method: "get",
        }
      );
      await accounts.respond(accountsMock, statusCode);
  
      contributions = await browser.mock(
        contributionsApiUrl,
        {
          method: "get",
        }
      );
      await contributions.respond(contributionsMock, statusCode);
  
      investmentSummary = await browser.mock(
        investmentSummaryApiUrl,
        {
          method: "get",
        }
      );
      await investmentSummary.respond(investmentSummaryMock, statusCode);
    });

    after(async ()=>{
      await login.restore()
      await pin.restore()
      await contributions.restore()
      await accounts.restore()
      await investmentSummary.restore()
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
      await login.respond(loginErrorMock, statusCode);
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