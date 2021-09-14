const { UI_USER_NAME } = process.env
const { UI_USER_PASSWORD } = process.env

export const loginCredentials = {
    username: UI_USER_NAME || new Error('username not found'),
    password: UI_USER_PASSWORD || new Error('password not found')
}

export const url = `${process.env.URL}`
export const loginApiUrl = `${process.env.API_BASE_URL}/login`
export const pinApiUrl = `${process.env.API_BASE_URL}/pin`
export const accountsApiUrl = `${process.env.API_BASE_URL}/myaccount/clients/${loginCredentials.username.toString().substring(2, 7)}?include=accounts,linked-accounts`
export const investmentSummaryApiUrl = `${process.env.API_BASE_URL}/myaccount/investment-summary-account`
export const performanceAccountsAggregatedApiUrl = `${process.env.API_BASE_URL}/myaccount/performance-accounts-aggregated?include=netcontribution-accounts-aggregated`
export const contributionAccountApiUrl = `${process.env.API_BASE_URL}/myaccount/contribution-account/`