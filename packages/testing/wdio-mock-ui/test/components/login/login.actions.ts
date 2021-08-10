import { expect } from 'chai'
import { usernameInput, passwordInput, loginBtn, alertMsg, pinLoginBtn } from './login.locators'
import { getPageHeading } from '../myAccounts/myAccounts.actions'
import { url } from '../../environments/stage'
import { open } from '../../components/browser/browser.actions'
import { headingTotalLabel } from '../investment/investment.locators'
import { stalenessOf } from 'wdio-wait-for'

export const getAlertMsgTxt = async () => {
  const alertMessage = await (await alertMsg()).waitForClickable()
  expect(alertMessage, 'Element not found').to.be.true
  return await (await alertMsg()).getText()
}

export const loginAction = async (username: string, password: string) => {
  // act
  await (await usernameInput()).waitForClickable()
  await browser.pause(1000)
  await (await usernameInput()).setValue(username)
  await (await passwordInput()).waitForClickable()
  await browser.pause(1000)
  await (await passwordInput()).setValue(password)
  await (await loginBtn()).waitForClickable()
  await browser.pause(1000)
  await (await loginBtn()).click()
  console.info('Login button pressed.')
}

export const performLogin = async (username: string, password: string) => {
  // act
  await open(url)
  await browser.refresh()
  await loginAction(username, password)

  // assert
  const alertMsg = await getAlertMsgTxt()
  const expectedAlertMsg = 'Success'
  expect(alertMsg).to.equal(expectedAlertMsg)

  // act
  await pinLoginAction()

  // assert
  const pageHeading = await getPageHeading()
  const expectedPageHeading = "FirstName's\nInvestments"
  expect(pageHeading).to.contain(expectedPageHeading)
  const totalValue = await headingTotalLabel()
  await totalValue.waitForDisplayed()
  await totalValue.getText()
  const expectedValue = 'Total Value'
  expect(await totalValue.getText()).to.contain(expectedValue)
  console.info('Login was successful.')
}

export const pinLoginAction = async () => {
  // act
  await (await pinLoginBtn()).waitForClickable()
  await (await pinLoginBtn()).click()
  await browser.waitUntil(stalenessOf(pinLoginBtn()))
  console.info('Pin login button pressed.')
}
