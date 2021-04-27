export const mockClient = {
  Data: {
    Type: 'contact',
    Id: '283732',
    Attributes: {
      ContactId: 283732,
      ClientNumber: '12837326',
      TitleId: 13,
      Title: 'Miss',
      FirstName: 'FirstName',
      LastName: 'LastName',
      ContactStatus: 'Hybrid',
      LastLoginDateTime: '2021-04-27T12:38:00',
      Username: null,
      CurrentPassword: null,
      NewPassword: null,
      DateOfBirth: '1973-02-25T00:00:00',
      ClientTypeId: 1,
      ClientType: 'Individual',
    },
    Links: {
      self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732',
    },
    Relationships: {
      'contact-links': {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/contact-links',
        },
        Data: null,
      },
      'investment-summary': {
        Links: {
          related:
            'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/investment-summary',
        },
        Data: null,
      },
      accounts: {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/accounts',
        },
        Data: null,
      },
      addresses: {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/addresses',
        },
        Data: null,
      },
      emails: {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/emails',
        },
        Data: null,
      },
      phones: {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/phones',
        },
        Data: null,
      },
      'linked-accounts': {
        Links: {
          related:
            'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/linked-accounts',
        },
        Data: null,
      },
      'contact-settings': {
        Links: {
          related:
            'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/contact-settings',
        },
        Data: null,
      },
      'user-basket': {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/user-basket',
        },
        Data: null,
      },
      features: {
        Links: {
          related: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732/features',
        },
        Data: null,
      },
    },
  },
  Included: [],
};

export const mockRefresh = {
  Data: {
    Type: 'refresh-token',
    Id: null,
    Attributes: {
      NewTokens: [
        {
          Application: 'MyAccountsApi',
          AccessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIwMDM1ZDcyZS04ODYxLTQwNTEtOTMzZS05ZmU1NWRmNGNhY2IiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IiIsImF1ZCI6Im15YWNjb3VudHNhcGkuYmVzdGludmVzdC5jby51ayIsImV4cCI6MTYxOTUyNjQ3NSwiaXNzIjoiaWRlbnRpdHlhcGkuYmVzdGludmVzdC5jby51ayJ9.8VqgH42-7QyXDkJKyWzetlkic1F7IQ5CKGeCpB8GeRw',
          RefreshToken: '216c2e8d-5599-45f4-9072-e1d3b4753b89',
          SessionId: '0035d72e-8861-4051-933e-9fe55df4cacb',
        },
        {
          Application: 'OisApi',
          AccessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIwMDM1ZDcyZS04ODYxLTQwNTEtOTMzZS05ZmU1NWRmNGNhY2IiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IiIsImF1ZCI6Im9pc2FwaS5iZXN0aW52ZXN0LmNvLnVrIiwiZXhwIjoxNjE5NTI2NDc1LCJpc3MiOiJpZGVudGl0eWFwaS5iZXN0aW52ZXN0LmNvLnVrIn0.87mnczgpqjHH4SJhIAA58vtMpFryUMrqoNqKoZrYq-I',
          RefreshToken: 'a829ada6-73a6-4efe-ad22-b8d0293b9b57',
          SessionId: '0035d72e-8861-4051-933e-9fe55df4cacb',
        },
      ],
      InvalidTokens: [],
    },
    Links: {
      self: 'https://identityapi.demo2.bestinvest.co.uk/api/refresh-token/',
    },
    Relationships: null,
  },
  Included: null,
};
