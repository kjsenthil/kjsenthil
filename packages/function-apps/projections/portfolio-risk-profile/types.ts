interface Fund {
    sedol: string,
    riskModel: string,
    equityProportion: number
}

interface FundWithDistance extends Fund {
    distance: number
}

type Funds = Fund[]

interface InputFormat {
    portfolioEquityPercentage: number,
    equityFunds: Funds
}

export type { Fund, Funds, FundWithDistance, InputFormat }
