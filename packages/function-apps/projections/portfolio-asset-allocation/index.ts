import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const assetAllocationMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const inputAccounts: Accounts = req.body

    let returnBody = {}
    let returnStatus = 200

    try {
        const portfolioEquityPercentage = calculatePortfolioEquityPercentage(inputAccounts)
        returnBody = { "portfolioEquityPercentage": portfolioEquityPercentage }
    }
    catch (e) {
        if(e instanceof InvalidEquityPercentageError) {
           returnBody = { "errorMessage": e.message }
            returnStatus = 400
        }
    }

    context.res = {
        body: returnBody,
        status: returnStatus
    }
}

interface Account {
    accountName: string,
    accountValue: number,
    equityPercentage: number
}

type Accounts = Account[]

class InvalidEquityPercentageError extends Error {
    constructor(accountName: string, equityPercentage: number) {
        const message = `Equity percentage must be between 0 and 100 for account: '${accountName}', got: ${equityPercentage}`
        super(message);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = InvalidEquityPercentageError.name
    }
}

function equityValue(account: Account): number {
    if(account.equityPercentage >= 0 && account.equityPercentage <= 100) {
        return account.accountValue * (account.equityPercentage / 100)
    }
    else {
       throw new InvalidEquityPercentageError(account.accountName, account.equityPercentage)
    }
}

function calculatePortfolioEquityPercentage(inputAccounts: Accounts): number {
    const totalEquityValue = inputAccounts
        .map(equityValue)
        .reduce((accumulator, equity) => accumulator + equity)
    const totalPortfolioValue = inputAccounts
        .map(account => account.accountValue)
        .reduce((accumulator, value) => accumulator + value)

    return (totalEquityValue / totalPortfolioValue) * 100
}

export { assetAllocationMain, calculatePortfolioEquityPercentage, equityValue }
