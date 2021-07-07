export const url = `${process.env.URL}`
export const loginApiUrl = `${process.env.API_BASE_URL}/login`
export const pinApiUrl = `${process.env.API_BASE_URL}/pin`
export const contributionsApiUrl = `${process.env.API_BASE_URL}/myaccount/performance-contact/2257889?include=contributions`
export const accountsApiUrl = `${process.env.API_BASE_URL}/myaccount/clients/2257889?include=accounts,linked-accounts`
export const investmentSummaryApiUrl = `${process.env.API_BASE_URL}/myaccount/investment-summary-account?filter[id]=136930,141370,137304,137307,157843,158412,159266`
export const refreshTokenApiUrl = `${process.env.API_BASE_URL}/refresh-token`

const MYACCOUNTS_USERNAME=22578896
const MYACCOUNTS_PASSWORD=12345678

export const loginCredentials = {
    username: MYACCOUNTS_USERNAME,
    password: MYACCOUNTS_PASSWORD
}