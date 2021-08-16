import { loginCredentials } from '../environments/stage'

export default {
  "data": {
    "uri": "pin",
    "type": "pin",
    "id": null,
    "attributes": {
      "id": null,
      "contactId": Number(`${loginCredentials.username.toString().substring(2, 7)}`),
      "tokens": [
        {
          "application": "MyAccountsApi",
          "accessToken": `${process.env.accessToken}`,
          "refreshToken": "af8f36fd-3ab4-4db5-a293-62a4ed0f9516",
          "sessionId": "8c6232e4-2885-4826-8314-e4cbb2bdcdb1"
        },
        {
          "application": "OisApi",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiI4YzYyMzJlNC0yODg1LTQ4MjYtODMxNC1lNGNiYjJiZGNkYjEiLCJjb250YWN0IjoiMjI1Nzg4OSIsImFjY291bnRzIjoiMTM2OTMwLDE0MTM3MCIsImxpbmthY2NvdW50cyI6IjEzNzMwNCwxMzczMDcsMTU3ODQzLDE1ODQxMiwxNTkyNjYiLCJ4cGxhbl9pZCI6IjQ1NTg3MjYiLCJhdWQiOiJvaXNhcGkuYmVzdGludmVzdC5jby51ayIsImV4cCI6MTYyNDYzNjY4NSwiaXNzIjoiaWRlbnRpdHlhcGkuYmVzdGludmVzdC5jby51ayJ9.LonGZQqq85Drj-BTk1whVc-D-mB-68porblwydYvkDE",
          "refreshToken": "6fd860f1-2a51-43c6-8396-8298e8714964",
          "sessionId": "8c6232e4-2885-4826-8314-e4cbb2bdcdb1"
        }
      ]
    },
    "links": { "self": "https://identityapi.demo2.bestinvest.co.uk/api/pin/" },
    "relationships": null
  },
  "included": null
}
