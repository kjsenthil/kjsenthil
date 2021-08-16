import { pageHeading, simpleMenu, logOutMenu } from './myAccounts.locators'

export const getPageHeading = async () => {
  await (await pageHeading()).waitForExist({ timeout: 25000 })
  await (await pageHeading()).waitForDisplayed({ timeout: 25000 })
  return await (await pageHeading()).getText()
}

export const logOut = async () => {
  await (await simpleMenu()).click()
  await (await logOutMenu()).waitForClickable()
  await (await logOutMenu()).click()
  await browser.pause(500)
}
