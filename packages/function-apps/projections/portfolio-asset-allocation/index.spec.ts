import {calculatePortfolioPercentages, getValue } from './index'

describe("Calculate portfolio asset allocation", () => {
    test("Calculates equity value for account", () => {
        const testAccount = createExtendedAccount("test", 500, 50, 50, true)
        const testAccountDecimal = createExtendedAccount("test", 2.50, 20, 20 ,true)
        expect(getValue(testAccount)).toBe(250)
        expect(getValue(testAccountDecimal)).toBe(0.5)
    });

    test("Equity less than 0 returns error", () => {
        const testAccount = createExtendedAccount("test", 500, -1, -1, true)
        expect(() => {
            getValue(testAccount)
        }).toThrow(/Equity percentage must be between 0 and 100/)
    });

    test("Equity more than 100 returns error", () => {
        const testAccount = createExtendedAccount("test", 500, 100.5, 100.5, true)
        expect(() => {
            getValue(testAccount)
        }).toThrow(/Equity percentage must be between 0 and 100/)
    });

    test("Calculates cash value for account", () => {
        const testAccount = createExtendedAccount("test", 500, 50, 50, false)
        const testAccountDecimal = createExtendedAccount("test", 2.50, 20, 20 , false)
        expect(getValue(testAccount)).toBe(250)
        expect(getValue(testAccountDecimal)).toBe(0.5)
    });

    test("Cash less than 0 returns error", () => {
        const testAccount = createExtendedAccount("test", 500, -1, -1, false)
        expect(() => {
            getValue(testAccount)
        }).toThrow(/Cash percentage must be between 0 and 100/)
    });

    test("Cash more than 100 returns error", () => {
        const testAccount = createExtendedAccount("test", 500, 100.5, 100.5, false)
        expect(() => {
            getValue(testAccount)
        }).toThrow(/Cash percentage must be between 0 and 100/)
    });

    test("Calculates percentages value for a portfolio - 1 account", () => {
        const account1 = createAccount("test", 500, 50, 50)
        const portfolio = [account1]
        const response = calculatePortfolioPercentages(portfolio)
        expect(response.equityPercentage).toBe(50)
        expect(response.cashPercentage).toBe(50)
    });

    test("Calculates equity value for a portfolio - 2 accounts with same equity", () => {
        const account1 = createAccount("test1", 500, 50, 50)
        const account2 = createAccount("test2", 1000, 50, 50)
        const portfolios = [account1, account2]
        const response = calculatePortfolioPercentages(portfolios)
        expect(response.equityPercentage).toBe(50)
        expect(response.cashPercentage).toBe(50)
    });
});

function createExtendedAccount(name: string, value: number, equityPercentage: number, cashPercenage: number, isEquity: boolean) {
    return {
        "account" : {
        "accountName": name,
        "accountValue": value,
        "equityPercentage": equityPercentage,
        "cashPercentage": cashPercenage,
        },
        "isEquity": isEquity
    }
}

function createAccount(name: string, value: number, equityPercentage: number, cashPercenage: number) {
    return {
        "accountName": name,
        "accountValue": value,
        "equityPercentage": equityPercentage,
        "cashPercentage": cashPercenage,
    }
}
