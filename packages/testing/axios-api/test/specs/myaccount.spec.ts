import axios from "axios";
import { expect } from "chai";
import {
  assert,
  object,
  number,
  string,
  boolean,
  array,
  nullable,
} from "superstruct";
import { accountIds } from "../environments/dev";
import { apiEndpoint } from "../utils/apiBuilder";
import { API_ENDPOINTS } from "../utils/apiEndPoints";
import { loginCredentials } from "../environments/dev";

describe("test myaccount endpoints", () => {
  let headers: object;
  let contactId: string;

  const isaAccountId: string = accountIds.isa_account_id as string;
  const giaAccountId: string = accountIds.gia_account_id as string;
  const sippAccountId: string = accountIds.sipp_account_id as string;
  const allAccountIds: string = accountIds.all_account_ids as string;

  before(() => {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
    contactId = process.env.CONTACT_ID as string;
  });

  it("get client", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_CLIENTS.replace("{id}", contactId));
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          ContactId: number(),
          ClientNumber: string(),
          TitleId: number(),
          Title: string(),
          FirstName: string(),
          LastName: string(),
          ContactStatus: string(),
          LastLoginDateTime: string(),
          Username: nullable(string()),
          CurrentPassword: nullable(string()),
          NewPassword: nullable(string()),
          DateOfBirth: string(),
          ClientTypeId: number(),
          ClientType: string(),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: object({
          "contact-links": object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          "investment-summary": object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          accounts: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          addresses: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          emails: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          phones: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          "linked-accounts": object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          "contact-settings": object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          "user-basket": object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          features: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
          documents: object({
            Links: object({
              related: string(),
            }),
            Data: nullable(array()),
          }),
        }),
      }),
      Included: array(
        object({
          Type: string(),
          Id: string(),
          Attributes: object({
            AccountId: number(),
            AccountName: string(),
            AccountNumber: string(),
            AccountStatus: string(),
            AccountStatusId: number(),
            BestInvestAccount: string(),
            CapacityType: string(),
            CapacityTypeId: number(),
            DDMandateId: nullable(number()),
            HasIncomeAccount: boolean(),
          }),
          Links: object({
            self: string(),
          }),
          Relationships: nullable(string()),
        })
      ),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { include: "accounts" },
      },
    });
    // Assert
    const { Data } = response.data;
    const { Included } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("contact");
    expect(Data.Id).to.equal(contactId);
    expect(Data.Attributes.ClientNumber).to.equal(
      String(loginCredentials.username)
    );
    expect(Data.Attributes.ContactStatus).to.equal("Hybrid");
    expect(Data.Attributes.ClientType).to.equal("Individual");

    const giaAccount = Included.filter((account) => {
      return account.Id === giaAccountId;
    });
    expect(giaAccount[0], "GIA_ACCOUNT is undefined").to.not.be.undefined;
    expect(giaAccount[0].Attributes.AccountId).to.equal(Number(giaAccountId));
    expect(giaAccount[0].Attributes.AccountName).to.equal(
      "Investment Account "
    );
    expect(giaAccount[0].Attributes.BestInvestAccount).to.equal("GIA");

    const isaAccount = Included.filter((account) => {
      return account.Id === isaAccountId;
    });
    expect(isaAccount[0], "ISA_ACCOUNT is undefined").to.not.be.undefined;
    expect(isaAccount[0].Attributes.AccountId).to.equal(Number(isaAccountId));
    expect(isaAccount[0].Attributes.AccountName).to.equal("ISA ");
    expect(isaAccount[0].Attributes.BestInvestAccount).to.equal("ISA");

    const sippAccount = Included.filter((account) => {
      return account.Id === sippAccountId;
    });
    expect(sippAccount[0], "SIPP_ACCOUNT is undefined").to.not.be.undefined;
    expect(sippAccount[0].Attributes.AccountId).to.equal(Number(sippAccountId));
    expect(sippAccount[0].Attributes.AccountName).to.equal("SIPP ");
    expect(sippAccount[0].Attributes.BestInvestAccount).to.equal("SIPP");
    assert(response.data, expectedSchema);
  });

  it("get performance contact", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.MYACCOUNT_PERFORMANCE_CONTACT.replace("{id}", contactId)
      );
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          AccountValue: number(),
          Performance: object({
            Value: number(),
            Percentage: nullable(number()),
          }),
          Values: array(
            object({
              Date: string(),
              Value: number(),
            })
          ),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: object({
          contributions: object({
            Links: object({
              related: string(),
            }),
            Data: object({
              Type: string(),
              Id: string(),
            }),
          }),
        }),
      }),
      Included: array(
        object({
          Type: string(),
          Id: string(),
          Attributes: object({
            TotalContributions: number(),
            Contributions: array(
              object({
                Date: string(),
                NetContributionsToDate: number(),
              })
            ),
          }),
          Links: object({
            self: string(),
          }),
          Relationships: nullable(string()),
        })
      ),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { include: "contributions" },
      },
    });

    // Assert
    const { Data } = response.data;
    const { Included } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("performance");
    expect(Data.Id).to.equal(contactId);

    expect(Included[0].Type).to.equal("contributions");
    expect(Included[0].Id).to.equal(contactId);
    assert(response.data, expectedSchema);
  });

  it("get breakdown allocation", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.MYACCOUNT_BREAKDOWN_ALLOCATION.replace(
          "{id}",
          isaAccountId
        )
      );
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          Breakdown: array(
            object({
              Name: string(),
              Percentage: number(),
            })
          ),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("breakdown-allocation");
    expect(Data.Id).to.equal(isaAccountId);
    expect(Data.Attributes.Breakdown[0].Name).to.equal("Equity");
    expect(Data.Attributes.Breakdown[1].Name).to.equal("Quality Bonds");
    expect(Data.Attributes.Breakdown[2].Name).to.equal("High Yield Bonds");
    expect(Data.Attributes.Breakdown[3].Name).to.equal("Property");
    expect(Data.Attributes.Breakdown[4].Name).to.equal("Commodities");
    expect(Data.Attributes.Breakdown[5].Name).to.equal("Hedge");
    expect(Data.Attributes.Breakdown[6].Name).to.equal("Fund Cash");
    expect(Data.Attributes.Breakdown[7].Name).to.equal("Uninvested Cash");
    assert(response.data, expectedSchema);
  });

  it("get aggregated breakdown allocation", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_AGGREGATED_BREAKDOWN_ALLOCATION);
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          Breakdown: array(
            object({
              Name: string(),
              Percentage: number(),
            })
          ),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { "filter[id]": `${`${giaAccountId},${isaAccountId}`}` },
      },
    });
    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("breakdown-allocation");
    expect(Data.Id).to.equal("");
    expect(Data.Attributes.Breakdown[0].Name).to.equal("Equity");
    expect(Data.Attributes.Breakdown[1].Name).to.equal("Quality Bonds");
    expect(Data.Attributes.Breakdown[2].Name).to.equal("High Yield Bonds");
    expect(Data.Attributes.Breakdown[3].Name).to.equal("Property");
    expect(Data.Attributes.Breakdown[4].Name).to.equal("Commodities");
    expect(Data.Attributes.Breakdown[5].Name).to.equal("Hedge");
    expect(Data.Attributes.Breakdown[6].Name).to.equal("Fund Cash");
    expect(Data.Attributes.Breakdown[7].Name).to.equal("Uninvested Cash");
    assert(response.data, expectedSchema);
  });

  it("get investment summary account", async () => {
    // Arrange
    const firstAccountId = allAccountIds.split(",")[0];
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        `${API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS}/${firstAccountId}`
      );
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          Funds: number(),
          Shares: number(),
          Cash: number(),
          Cost: number(),
          GainLoss: number(),
          GainLossPercent: nullable(number()),
          LastUpdate: string(),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("investment-summary");
    expect(Data.Id).to.equal(giaAccountId);
    assert(response.data, expectedSchema);
  });

  it("get aggregated investment summary account", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS);
    const expectedSchema = object({
      Data: array(
        object({
          Type: string(),
          Id: string(),
          Attributes: object({
            Funds: number(),
            Shares: number(),
            Cash: number(),
            Cost: number(),
            GainLoss: number(),
            GainLossPercent: nullable(number()),
            LastUpdate: string(),
          }),
          Links: object({
            self: string(),
          }),
          Relationships: nullable(object()),
        })
      ),
      Included: nullable(array()),
    });
    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { "filter[id]": `${allAccountIds}` },
      },
    });
    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data[0].Type).to.equal("investment-summary");
    expect(Data[0].Id).to.equal(giaAccountId);
    expect(Data[1].Type).to.equal("investment-summary");
    expect(Data[1].Id).to.equal(isaAccountId);
    expect(Data[2].Type).to.equal("investment-summary");
    expect(Data[2].Id).to.equal(sippAccountId);
    assert(response.data, expectedSchema);
  });

  it.skip("get monthly savings", async () => {
    // Arrange
    const firstAccountId = allAccountIds.split(",")[0];
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.MYACCOUNT_MONTHLY_SAVINGS.replace("{id}", firstAccountId)
      );
    const expectedSchema = object({});
    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it("get contribution account", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_CONTRIBUTION.replace("{id}", isaAccountId));
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          TotalContributions: number(),
          Contributions: array(
            object({
              Date: string(),
              NetContributionsToDate: number(),
            })
          ),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });

    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("contributions");
    expect(Data.Id).to.equal(isaAccountId);
    assert(response.data, expectedSchema);
  });

  it("get isa contributions", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.MYACCOUNT_ISA_CONTRIBUTIONS.replace("{id}", contactId)
      );
    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: string(),
        Attributes: object({
          Allowance: number(),
          Contributions: number(),
        }),
        Links: object({
          self: string(),
        }),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });

    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("isa-contributions");
    expect(Data.Id).to.equal(contactId);
    assert(response.data, expectedSchema);
  });

  it("get investments", async () => {
    // Arrange
    const firstAccountId = allAccountIds.split(",")[0];
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.MYACCOUNT_INVESTMENTS.replace("{id}", firstAccountId)
      );
    const expectedSchema = object({
      Data: array(
        object({
          Type: string(),
          Id: string(),
          Attributes: object({
            PortfolioId: number(),
            Sedol: string(),
            Isin: string(),
            AssetId: number(),
            AssetName: string(),
            AssetGroup: string(),
            Value: number(),
            Cost: number(),
            GainLoss: nullable(number()),
            GainLossPercent: nullable(number()),
            Units: number(),
            Price: number(),
            Change: number(),
            ChangePercentage: number(),
            Tradable: number(),
            LastUpdate: string(),
            Rated: boolean(),
            TradableStatus: string(),
          }),
          Links: nullable(object()),
          Relationships: nullable(object()),
        })
      ),
      Included: nullable(array()),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
    });

    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data[0].Type).to.equal("investments");
    assert(response.data, expectedSchema);
  });

  it("get net contribution accounts aggregated", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_AGGREGATED_NET_CONTRIBUTIONS);

    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: nullable(string()),
        Attributes: object({
          TotalContributions: number(),
          NetContributions: array(
            object({
              Date: string(),
              NetContributionsToDate: number(),
            })
          ),
        }),
        Links: nullable(object()),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { "filter[id]": `${allAccountIds}` },
      },
    });

    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("net-contributions");
    assert(response.data, expectedSchema);
  });

  it("get performance accounts aggregated", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_AGGREGATED_PERFORMANCE_ACCOUNTS);

    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: nullable(string()),
        Attributes: object({
          AccountValue: number(),
          Performance: object({
            Value: number(),
            Percentage: nullable(number()),
          }),
          Values: array(
            object({
              Date: string(),
              Value: number(),
            })
          ),
        }),
        Links: nullable(object()),
        Relationships: nullable(object()),
      }),
      Included: nullable(array()),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: { "filter[id]": `${allAccountIds}` },
      },
    });

    // Assert
    const { Data } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("performance-accounts-aggregated");
    assert(response.data, expectedSchema);
  });

  it("get performance accounts aggregated with net contribution", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.MYACCOUNT_AGGREGATED_PERFORMANCE_ACCOUNTS);

    const expectedSchema = object({
      Data: object({
        Type: string(),
        Id: nullable(string()),
        Attributes: object({
          AccountValue: number(),
          Performance: object({
            Value: number(),
            Percentage: nullable(number()),
          }),
          Values: array(
            object({
              Date: string(),
              Value: number(),
            })
          ),
        }),
        Links: nullable(object()),
        Relationships: nullable(object()),
      }),
      Included: nullable(
        array(
          object({
            Type: string(),
            Id: nullable(number()),
            Attributes: object({
              TotalContributions: number(),
              NetContributions: array(
                object({
                  Date: string(),
                  NetContributionsToDate: number(),
                })
              ),
            }),
            Links: nullable(object()),
            Relationships: nullable(object()),
          })
        )
      ),
    });

    // Act
    const response = await axios.get(apiUrl, {
      headers,
      ...{
        params: {
          "filter[id]": `${allAccountIds}`,
          include: "netcontribution-accounts-aggregated",
        },
      },
    });

    // Assert
    const { Data } = response.data;
    const { Included } = response.data;
    expect(response.status).to.equal(200);
    expect(Data.Type).to.equal("performance-accounts-aggregated");
    expect(Included[0].Type).to.equal("netcontribution-accounts-aggregated");
    assert(response.data, expectedSchema);
  });
});
