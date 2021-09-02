import {AzureFunction, Context, HttpRequest} from "@azure/functions"
import {Fund, Funds, FundWithDistance, InputFormat} from "./types";

const riskProfileMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let responseBody = {}
    let responseStatus = 200

    try {
        const input: InputFormat = req.body
        const closestFund = calculateClosestFund(input.equityFunds, input.portfolioEquityPercentage)
        responseBody = {
            "riskModel": closestFund.riskModel,
            "sedol": closestFund.sedol
        }
    }
    catch (e) {
        if (e instanceof Error) {
            responseBody = { "errorMessage": e.message }
        }

        responseStatus = 400
    }

    context.res = {
        body: responseBody,
        status: responseStatus
    }
}

function calculateClosestFund(funds: Funds, portfolioEquity: number): FundWithDistance {
    const sortedFunds = funds
        .map(fund => { return calculateFundDistance(fund, portfolioEquity) })
        .sort(sortFundsByDistance)
    return sortedFunds[0]
}

function calculateFundDistance(fund: Fund, portfolioEquity: number): FundWithDistance {
    return {
        "sedol": fund.sedol,
        "riskModel": fund.riskModel,
        "distance": Math.abs(portfolioEquity - fund.equityProportion),
        "equityProportion": fund.equityProportion
    }
}

function sortFundsByDistance(fund1: FundWithDistance, fund2: FundWithDistance): number {
    if (fund1.distance === fund2.distance) {
        return fund1.equityProportion > fund2.equityProportion ? 1 : -1
    }

    return fund1.distance > fund2.distance ? 1 : -1
}

export { riskProfileMain, calculateClosestFund, calculateFundDistance, sortFundsByDistance }
