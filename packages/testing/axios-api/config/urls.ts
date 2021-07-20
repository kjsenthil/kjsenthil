const { PR_UI_USERNAME } = process.env
const { PR_UI_PASSWORD } = process.env

export const loginCredentials = {
    username: PR_UI_USERNAME || new Error('username not found'),
    password: PR_UI_PASSWORD || new Error('password not found')
}

export const url = `${process.env.URL}`
export const loginApiUrl = `${process.env.API_BASE_URL}/login`
export const pinApiUrl = `${process.env.API_BASE_URL}/pin`
export const CLIENT_ID = 'myaccount-spa';
