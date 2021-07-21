import { pageHeading, simpleMenu, logOut } from './myaccount.locators'

export const getPageHeading = async () => {
    await (await pageHeading()).waitForExist({ timeout: 25000 });
    await (await pageHeading()).waitForDisplayed({ timeout: 25000 });
    return await (await pageHeading()).getText()}

export const logout = async () => {
    await (await simpleMenu()).click()
    await (await logOut()).waitForExist({ timeout: 3000 })
    await (await logOut()).waitForDisplayed({ timeout: 3000 });
    await (await logOut()).click()
    await browser.pause(500)
}