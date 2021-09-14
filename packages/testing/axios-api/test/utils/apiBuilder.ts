import { apiBaseUrl } from '../environments/env'

let BASE_URL = '';
export const apiEndpoint =  {

    getBaseUrl: () => {
        BASE_URL = apiBaseUrl
        return apiEndpoint
    }, 

    path: (path) => {
        return `${BASE_URL}${path}`
    }
}

