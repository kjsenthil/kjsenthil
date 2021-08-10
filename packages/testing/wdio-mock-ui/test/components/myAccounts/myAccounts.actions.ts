import { expect } from 'chai'
import { pageHeading, simpleMenu, logOut } from './myAccounts.locators'

export const getPageHeading = async () => {
  expect(await (await pageHeading()).waitForDisplayed({ timeout: 25000 })).to.be.true
  return await (await pageHeading()).getText()
}

export const logout = async () => {
  await (await simpleMenu()).click()
  await (await logOut()).waitForClickable()
  await (await logOut()).click()
}
