import { usernameInput, passwordInput, loginBtn, alertMsg, pinLoginBtn } from './login.locators'

export const loginAction = async (username: string, password: string) => {
    await (await usernameInput()).waitForExist({ timeout: 5000 })
    await (await usernameInput()).waitForDisplayed({ timeout: 5000 })
    await browser.pause(1000)
    await (await usernameInput()).setValue(username)
    await browser.pause(1000)
    await (await passwordInput()).setValue(password)
    await browser.pause(1000)
    await (await loginBtn()).click()
}

export const getAlertMsgTxt = async () => {
    await (await alertMsg()).waitForDisplayed({ timeout: 5000 })
    return await (await alertMsg()).getText()
}
    
export const pinLoginAction = async () => {
    await (await usernameInput()).waitForExist({ timeout: 5000 })
    await (await usernameInput()).waitForDisplayed({ timeout: 5000 })
    await (await pinLoginBtn()).click()
}