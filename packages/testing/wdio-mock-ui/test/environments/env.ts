const { PR_UI_USERNAME } = process.env
const { PR_UI_PASSWORD } = process.env

export const loginCredentials = {
    username: PR_UI_USERNAME || new Error('username not found'),
    password: PR_UI_PASSWORD || new Error('password not found')
}

export const url = `${process.env.URL}`
export const loginApiUrl = `${process.env.API_BASE_URL}/login`
export const pinApiUrl = `${process.env.API_BASE_URL}/pin`
export const accountsApiUrl = `${process.env.API_BASE_URL}/myaccount/clients/${loginCredentials.username.toString().substring(2, 7)}?include=accounts,linked-accounts`
export const investmentSummaryApiUrl = `${process.env.API_BASE_URL}/myaccount/investment-summary-account`
export const performanceAccountsAggregatedApiUrl = `${process.env.API_BASE_URL}/myaccount/performance-accounts-aggregated?include=netcontribution-accounts-aggregated`
export const contributionAccountApiUrl = `${process.env.API_BASE_URL}/myaccount/contribution-account/`