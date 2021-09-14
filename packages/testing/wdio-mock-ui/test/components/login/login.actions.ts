import {
  usernameInput,
  passwordInput,
  loginBtn,
  alertMsg,
  pinLoginBtn,
  pinLoginField1,
  pinLoginField2,
  pinLoginField3,
} from './login.locators'
import { url } from '../../environments/env'
import { open } from '../browser/browser.actions'
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
  const expectedPageHeading = 'Total Value:'
  expect(pageHeading).to.contain(expectedPageHeading)
}

export const pinLoginAction = async () => {
  await populatePinField(await pinLoginField1())
  await populatePinField(await pinLoginField2())
  await populatePinField(await pinLoginField3())

  await (await pinLoginBtn()).waitForClickable()
  await (await pinLoginBtn()).click()
}

const populatePinField = async (pinLoginField: WebdriverIO.Element) => {
  await pinLoginField.waitForClickable()
  const pinLabel = await pinLoginField.getComputedLabel()
  const pinValue = pinLabel.substr(0, 1)
  pinLoginField.setValue(pinValue)
}
