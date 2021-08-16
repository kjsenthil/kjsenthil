import { loginCredentials } from '../environments/stage'

export default {
  "Data": {
    "Type": "contact",
    "Id": `${loginCredentials.username.toString()}`,
    "Attributes": {
      "ContactId": Number(`${loginCredentials.username.toString()}`),
      "ClientNumber": `${loginCredentials.username.toString()}`,
      "TitleId": 1,
      "Title": "Mr.",
      "FirstName": "FirstName",
      "LastName": "LastName",
      "ContactStatus": "Platform",
      "LastLoginDateTime": "2021-06-28T11:21:00",
      "Username": null,
      "CurrentPassword": null,
      "NewPassword": null,
      "DateOfBirth": "1973-02-16T00:00:00",
      "ClientTypeId": 1,
      "ClientType": "Individual"
    },
    "Links": {
      "self": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889"
    },
    "Relationships": {
      "contact-links": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/contact-links"
        },
        "Data": null
      },
      "investment-summary": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/investment-summary"
        },
        "Data": null
      },
      "accounts": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/accounts"
        },
        "Data": [
          {
            "Type": "accounts",
            "Id": "136930"
          },
          {
            "Type": "accounts",
            "Id": "141370"
          }
        ]
      },
      "addresses": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/addresses"
        },
        "Data": null
      },
      "emails": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/emails"
        },
        "Data": null
      },
      "phones": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/phones"
        },
        "Data": null
      },
      "linked-accounts": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/linked-accounts"
        },
        "Data": [
          {
            "Type": "linked-accounts",
            "Id": "137304"
          },
          {
            "Type": "linked-accounts",
            "Id": "137307"
          },
          {
            "Type": "linked-accounts",
            "Id": "157843"
          },
          {
            "Type": "linked-accounts",
            "Id": "158412"
          },
          {
            "Type": "linked-accounts",
            "Id": "159266"
          }
        ]
      },
      "contact-settings": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/contact-settings"
        },
        "Data": null
      },
      "user-basket": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/user-basket"
        },
        "Data": null
      },
      "features": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/features"
        },
        "Data": null
      },
      "documents": {
        "Links": {
          "related": "https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/2257889/documents"
        },
        "Data": null
      }
    }
  },
  "Included": [
    {
      "Type": "accounts",
      "Id": "136930",
      "Attributes": {
        "AccountId": 136930,
        "AccountName": "Investment Account ",
        "AccountNumber": "BI1369301",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "GIA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 50224,
        "HasIncomeAccount": false
      },
      "Links": {
        "self": "https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/136930"
      },
      "Relationships": null
    },
    {
      "Type": "accounts",
      "Id": "141370",
      "Attributes": {
        "AccountId": 141370,
        "AccountName": "ISA ",
        "AccountNumber": "BI1413706",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "ISA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 54512,
        "HasIncomeAccount": false
      },
      "Links": {
        "self": "https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/141370"
      },
      "Relationships": null
    },
    {
      "Type": "linked-accounts",
      "Id": "137304",
      "Attributes": {
        "AccountId": 137304,
        "AccountName": "Junior ISA ",
        "AccountNumber": "BI1373045",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "JISA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 50474,
        "HasIncomeAccount": false
      },
      "Links": null,
      "Relationships": null
    },
    {
      "Type": "linked-accounts",
      "Id": "137307",
      "Attributes": {
        "AccountId": 137307,
        "AccountName": "Junior ISA ",
        "AccountNumber": "BI1373078",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "JISA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 50475,
        "HasIncomeAccount": false
      },
      "Links": null,
      "Relationships": null
    },
    {
      "Type": "linked-accounts",
      "Id": "157843",
      "Attributes": {
        "AccountId": 157843,
        "AccountName": "ISA ",
        "AccountNumber": "BI1578439",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "ISA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 69540,
        "HasIncomeAccount": false
      },
      "Links": null,
      "Relationships": null
    },
    {
      "Type": "linked-accounts",
      "Id": "158412",
      "Attributes": {
        "AccountId": 158412,
        "AccountName": "Investment Account ",
        "AccountNumber": "BI1584126",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "GIA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": null,
        "HasIncomeAccount": false
      },
      "Links": null,
      "Relationships": null
    },
    {
      "Type": "linked-accounts",
      "Id": "159266",
      "Attributes": {
        "AccountId": 159266,
        "AccountName": "ISA ",
        "AccountNumber": "BI1592668",
        "AccountStatus": "Open",
        "AccountStatusId": 2,
        "BestInvestAccount": "ISA",
        "CapacityType": "Execution Only",
        "CapacityTypeId": 3,
        "DDMandateId": 71585,
        "HasIncomeAccount": false
      },
      "Links": null,
      "Relationships": null
    }
  ]
}