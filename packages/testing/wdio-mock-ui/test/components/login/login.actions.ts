import { usernameInput, passwordInput, loginBtn, alertMsg, pinLoginBtn } from './login.locators'
import { url } from '../../environments/stage'
import { open } from '../../components/browser/browser.actions'
import { expect } from 'chai'
import { getPageHeading } from '../myAccounts/myAccounts.actions'

export const getAlertMsgTxt = async () => {
  await (await alertMsg()).waitForClickable()
  return await (await alertMsg()).getText()
}

export const loginAction = async (username: string, password: string) => {
  await (await usernameInput()).waitForClickable()
  await browser.pause(1000)
  await (await usernameInput()).setValue(username)
  await (await passwordInput()).waitForClickable()
  await browser.pause(1000)
  await (await passwordInput()).setValue(password)
  await (await loginBtn()).waitForClickable()
  await browser.pause(1000)
  await (await loginBtn()).click()
}

export const performLogin = async (username: string, password: string) => {
  await open(url)
  await loginAction(username, password)
  const alertMsg = await getAlertMsgTxt()
  const expectedAlertMsg = 'Success'
  expect(alertMsg).to.equal(expectedAlertMsg)
  await pinLoginAction()
  const pageHeading = await getPageHeading()
  const expectedPageHeading = "FirstName's\nInvestments"
  expect(pageHeading).to.contain(expectedPageHeading)
}

export const pinLoginAction = async () => {
  await (await pinLoginBtn()).waitForClickable()
  await (await pinLoginBtn()).click()
}
