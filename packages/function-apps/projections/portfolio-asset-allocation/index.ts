import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const assetAllocationMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const inputAccounts: Accounts = req.body

    let returnBody = {}
    let returnStatus = 200

    try {
        const portfolioPercentages = calculatePortfolioPercentages(inputAccounts)
        returnBody = { "portfolioEquityPercentage": portfolioPercentages.equityPercentage, "portfolioCashPercentage": portfolioPercentages.cashPercentage }
    }
    catch (e) {
        if(e instanceof InvalidPercentageError) {
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
    equityPercentage: number,
    cashPercentage: number
}

interface ExtendedAccount {
    account: Account,
    isEquity: boolean
}

interface Percentages {
    equityPercentage: number,
    cashPercentage: number,
}

type Accounts = Account[]

class InvalidPercentageError extends Error {
    constructor(accountName: string, percentage: number, percentageType: string) {
        const message = `${percentageType} percentage must be between 0 and 100 for account: '${accountName}', got: ${percentage}`
        super(message);
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = InvalidPercentageError.name
    }
}

function getValue(extendedAccount: ExtendedAccount): number {
    const percentage = getPercentage(extendedAccount);

    if(percentage >= 0 && percentage <= 100) {
        return extendedAccount.account.accountValue * (percentage / 100)
    }
    else {
       throw new InvalidPercentageError(extendedAccount.account.accountName, percentage, getPercentageType(extendedAccount))
    }
}

function calculatePortfolioPercentages(inputAccounts: Accounts): Percentages {
    const totalEquityValue = inputAccounts
        .map(account => getValue({account, isEquity : true}))
        .reduce((accumulator, equity) => accumulator + equity)
    
    const totalCashValue = inputAccounts
        .map(account => getValue({account, isEquity : false}))
        .reduce((accumulator, equity) => accumulator + equity)

    const totalPortfolioValue = inputAccounts
        .map(account => account.accountValue)
        .reduce((accumulator, value) => accumulator + value)

    return { "equityPercentage": (totalEquityValue / totalPortfolioValue) * 100, "cashPercentage": (totalCashValue / totalPortfolioValue) * 100, } as Percentages
}

function getPercentage(extendedAccount: ExtendedAccount) : number {
    return extendedAccount.isEquity ? extendedAccount.account.equityPercentage : extendedAccount.account.cashPercentage;
}

function getPercentageType(extendedAccount: ExtendedAccount) : string {
    return extendedAccount.isEquity ? "Equity" : "Cash";
}

export { assetAllocationMain, calculatePortfolioPercentages, getValue }
